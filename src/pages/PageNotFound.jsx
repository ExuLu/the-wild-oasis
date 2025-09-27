import Heading from '../ui/Heading';

import { useMoveBack } from '../hooks/useMoveBack';

import styled from 'styled-components';

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  flex: 0 1 96rem;
  text-align: center;
  padding: 4.8rem;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

const StyledPageNotFound = styled.main`
  align-items: center;
  background-color: var(--color-grey-50);
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: 4.8rem;
`;

const PageNotFound = () => {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as='h1'>
          The page you are looking for could not be found 😢
        </Heading>
        <button onClick={moveBack} size='large'>
          &larr; Go back
        </button>
      </Box>
    </StyledPageNotFound>
  );
};

export default PageNotFound;
