import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';

import { useLogout } from './useLogout';

const Logout = () => {
  const { isPending, logout } = useLogout();

  return (
    <ButtonIcon disabled={isPending} onClick={() => logout()}>
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
