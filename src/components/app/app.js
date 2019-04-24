import React from 'react';

import { Box, Grommet } from 'grommet';

import 'sanitize.css';

import { GlobalStyle } from 'Styles/global-styles';
import { colors } from 'Styles/colors';

import { AppBar } from 'Components/app-bar/app-bar';
import Main from 'Components/main/main';
import { Footer } from 'Components/footer/footer';

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
        <AppBar />
        <Main />
        <Footer />
      </Box>
    </Grommet>
  </>
);

export default App;
