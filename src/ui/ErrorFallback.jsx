import Button from './Button';
import Heading from './Heading';

import GlobalStyles from '../styles/GlobalStyles';
import styled from 'styled-components';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  flex: 0 1 96rem;
  padding: 4.8rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    color: var(--color-grey-500);
    font-family: 'Sono';
    margin-bottom: 3.2rem;
  }
`;

const StyledErrorFallback = styled.main`
  align-items: center;
  background-color: var(--color-grey-50);
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: 4.8rem;
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as='h1'>Something went wrong 🧐</Heading>
          <p>{error.message}</p>
          <Button onClick={resetErrorBoundary} size='large'>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
};

export default ErrorFallback;
