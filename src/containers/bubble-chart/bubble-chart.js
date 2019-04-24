import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import * as d3 from 'd3';

function getData() {
  const numItems = 20 + Math.floor(20 * Math.random());
  const data = [];
  for (let i = 0; i < numItems; i += 1) {
    data.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random(),
      colour: i % 5,
    });
  }
  return data;
}

const colours = ['#bc6027', '#6ec3cb', '#c9cfd1', '#4b4e4f', '#50909a'];

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateStyleAndAttrs = this.updateChart.bind(this);
  }

  handleClick() {
    this.setState({
      data: getData(),
    });
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    const maxRadius = 40;

    const xScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.props.width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, this.props.height]);

    const rScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, maxRadius]);

    const u = d3
      .select(this.svgEl)
      .selectAll('circle')
      .data(this.state.data);

    u.enter()
      .append('circle')
      .attr('cx', 0.5 * this.props.width)
      .attr('cy', 0.5 * this.props.height)
      .style('fill', '#fff')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', d => rScale(d.r))
      .style('fill', d => colours[d.colour]);

    u.exit().remove();
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
        <Box align="center">
          <Button label="Update" onClick={this.handleClick} />
        </Box>
      </div>
    );
  }
}

Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export const BubbleChart = () => (
  <Box
    alignSelf="center"
    align="center"
    pad={{ vertical: 'medium' }}
    direction="column"
  >
    <Chart width={window.innerWidth} height={window.innerHeight - 100} />
  </Box>
);

export default BubbleChart;
