import React from 'react';

import { Box, Grommet } from 'grommet';

import 'sanitize.css';

import { GlobalStyle } from 'Styles/global-styles';
import { colors } from 'Styles/colors';

import Main from 'Components/main/main';
import Page2 from 'Components/page-2/page-2';
import Page3 from 'Components/page-3/page-3';

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
      <Box fill>
        <Main />
        <Page2 />
        <Page3 />
      </Box>
    </Grommet>
  </>
);

export default App;
