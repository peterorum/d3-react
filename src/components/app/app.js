import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

import { Grommet } from 'grommet';

import 'sanitize.css';

import { GlobalStyle } from 'Styles/global-styles';
import { colors } from 'Styles/colors';

import { config } from 'Config/config';

import Cats from 'Containers/cats/cats';
import BubbleChart from 'Containers/bubble-chart/bubble-chart';
import BubbleChart2 from 'Containers/bubble-chart-2/bubble-chart-2';

const theme = {
  global: {
    font: {
      family: 'Lato',
    },
    colors: {
      brand: colors.primary,
    },
  },
};

export const App = () => (
  <>
    <Grommet theme={theme} full>
      <GlobalStyle />

      <ReactFullpage
        licenseKey={config.fullPageKey}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <BubbleChart2 />
            </div>
            <div className="section">
              <BubbleChart />
            </div>
            <div className="section">
              <Cats />
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </Grommet>
  </>
);

export default App;
