import { useUser } from './useUser';

import styled from 'styled-components';

const Avatar = styled.img`
  aspect-ratio: 1;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  object-position: center;
  outline: 2px solid var(--color-grey-100);
  width: 4rem;
  width: 3.6rem;
`;

const StyledUserAvatar = styled.div`
  align-items: center;
  color: var(--color-grey-600);
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  gap: 1.2rem;
`;

const UserAvatar = () => {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        alt={`Avatar of ${fullName}`}
        src={avatar || 'default-user.jpg'}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
