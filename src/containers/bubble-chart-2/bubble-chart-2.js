import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import * as d3 from 'd3';
import uuidv1 from 'uuid/v1';

async function getData() {
  const data = await d3.csv(
    'https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.csv',
    ({ id, value }) => ({
      name: id.split('.').pop(),
      title: id.replace(/\./g, '/'),
      group: id.split('.')[1],
      value: +value,
    }),
  );

  return data;
}

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: null };
  }

  async componentDidMount() {
    const data = await getData();

    this.setState({ data }, () => this.updateChart());
  }

  updateChart() {
    if (!this.state.data) {
      return;
    }

    const color = d3.scaleOrdinal(
      this.state.data.map(d => d.group),
      d3.schemeCategory10,
    );

    const pack = data =>
      d3
        .pack()
        .size([this.props.width - 2, this.props.height - 2])
        .padding(3)(d3.hierarchy({ children: data }).sum(d => d.value));

    const format = d3.format(',d');

    const root = pack(this.state.data);

    const svg = d3
      .select(this.svgEl)
      .style('width', '100%')
      .style('height', 'auto')
      .attr('font-size', 10)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle');

    const leaf = svg
      .selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`);

    leaf
      .append('circle')
      .attr('id', d => {
        d.leafUid = uuidv1(); // eslint-disable-line no-param-reassign
        return d.leafUid;
      })
      .attr('r', d => d.r)
      .attr('fill-opacity', 0.7)
      .attr('fill', d => color(d.data.group));

    leaf
      .append('clipPath')
      .attr('id', d => {
        d.clipUid = uuidv1(); // eslint-disable-line no-param-reassign
        return d.clipUid;
      })
      .append('use')
      .attr('xlink:href', d => d.leafUid.href);

    leaf
      .append('text')
      .attr('clip-path', d => d.clipUid)
      .selectAll('tspan')
      .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
      .join('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d);

    leaf.append('title').text(d => `${d.data.title}\n${format(d.value)}`);

    svg.exit().remove();
  }

  render() {
    return (
      <div>
        <svg
          width={this.props.width}
          height={this.props.height}
          ref={el => {
            this.svgEl = el;
          }}
        />
      </div>
    );
  }
}

Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export const BubbleChart2 = () => (
  <Box
    alignSelf="center"
    align="center"
    pad={{ vertical: 'medium' }}
    direction="column"
  >
    <Chart width={window.innerWidth} height={window.innerHeight - 20} />
  </Box>
);

export default BubbleChart2;
