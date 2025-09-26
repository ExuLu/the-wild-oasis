import { BiLoaderAlt } from "react-icons/bi";

import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  animation: ${rotate} 1.5s infinite linear;
  height: 2.4rem;
  width: 2.4rem;
`;

export default SpinnerMini;
