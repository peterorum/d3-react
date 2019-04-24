import React from 'react';
import { Box } from 'grommet';
import { Page } from 'Styles/page';

export const Page2 = () => {
  return (
    <Page>
      <Box
        alignSelf="center"
        align="center"
        pad={{ vertical: 'medium' }}
        direction="column"
      >
        <h1>Page 2</h1>
      </Box>
    </Page>
  );
};

export default Page2;
