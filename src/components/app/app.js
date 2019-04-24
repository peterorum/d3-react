import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

import { Grommet } from 'grommet';

import 'sanitize.css';

import { GlobalStyle } from 'Styles/global-styles';
import { colors } from 'Styles/colors';

import Cats from 'Containers/cats/cats';
import BubbleChart from 'Containers/bubble-chart/bubble-chart';
import Page3 from 'Containers/page-3/page-3';

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
        render={() => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <BubbleChart />
            </div>
            <div className="section">
              <Cats />
            </div>
            <div className="section">
              <Page3 />
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </Grommet>
  </>
);

export default App;
