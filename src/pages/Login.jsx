import Heading from '../ui/Heading';
import Logo from '../ui/Logo';
import LoginForm from '../features/authentication/LoginForm';

import styled from 'styled-components';

const LoginLayout = styled.main`
  align-content: center;
  background-color: var(--color-grey-50);
  display: grid;
  gap: 3.2rem;
  grid-template-columns: 48rem;
  justify-content: center;
  min-height: 100vh;
`;

const Login = () => {
  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Login to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
