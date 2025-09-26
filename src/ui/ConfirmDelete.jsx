import Button from './Button';
import Heading from './Heading';

import styled from 'styled-components';

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 40rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    gap: 1.2rem;
    justify-content: flex-end;
  }
`;

const ConfirmDelete = ({ resourceName, onConfirm, disabled, onCloseModal }) => {
  return (
    <StyledConfirmDelete>
      <Heading as='h3'>Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          disabled={disabled}
          onClick={onCloseModal}
          variation='secondary'
        >
          Cancel
        </Button>
        <Button disabled={disabled} onClick={onConfirm} variation='danger'>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
};

export default ConfirmDelete;
