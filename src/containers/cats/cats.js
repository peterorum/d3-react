import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import '@babel/polyfill';

import { connect } from 'react-redux';

import styled from 'styled-components';

import { Box, Button, Image, Text, Anchor } from 'grommet';

import { getCatUrl } from 'Redux/actions/cat-actions';
import { makeCatUrlSelector } from 'Redux/selectors/cat-selectors';

const PhotoBox = styled(Box)`

  text-align: center;
  min-height: 75vh;

  &.photo {
    transition: opacity 1s ease-in;
    opacity: 1;

    &.hidden {
      opacity: 0;
    }

    img {
      width: 90%;
      max-height: 70vh;
    }
  }
`;

export const Cats = ({ catUrl, handleCatUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  // on mount
  useEffect(() => {
    getCats();
  }, []);

  const getCats = () => {
    setIsLoading(true);
    handleCatUrl();
  };

  return (
    <Box
      alignSelf="center"
      align="center"
      pad={{ vertical: 'medium' }}
      direction="column"
    >
      <Box>
        <Button
          label="Another"
          disabled={isLoading}
          onClick={() => {
            getCats();
          }}
        />
      </Box>

      <PhotoBox pad="medium" className={`photo ${isLoading ? 'hidden' : ''}`}>
        {catUrl && (
          <>
            <div>
              <Image
                src={catUrl}
                onLoad={() => setIsLoading(false)}
                fit="cover"
              />
            </div>
            <div>
              <Text size="small">
                Cats from{' '}
                <Anchor href="https://thecatapi.com/" target="_blank">
                  The Cat API
                </Anchor>
              </Text>
            </div>
          </>
        )}
      </PhotoBox>
    </Box>
  );
};

Cats.propTypes = {
  catUrl: PropTypes.string,
  handleCatUrl: PropTypes.func,
};

const mapStateToProps = state => ({
  catUrl: makeCatUrlSelector(state),
});

const mapDispatchToProps = dispatch => ({
  handleCatUrl: () => dispatch(getCatUrl()),
});

const CatsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cats);

export default CatsContainer;
