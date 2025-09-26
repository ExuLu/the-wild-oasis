import styled from 'styled-components';

const Error = styled.span`
  color: var(--color-red-700);
  font-size: 1.4rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const FormRowVertical = ({ label, error, children }) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRowVertical;
