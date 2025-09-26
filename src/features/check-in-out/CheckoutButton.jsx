import Button from '../../ui/Button';

import { useCheckout } from './useCheckout';

const CheckoutButton = ({ bookingId }) => {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
      size='small'
      variation='primary'
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
