import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from './Spinner';

import { useUser } from '../features/authentication/useUser';

import styled from 'styled-components';

const FullPage = styled.div`
  align-items: center;
  background-color: var(--color-grey-50);
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
