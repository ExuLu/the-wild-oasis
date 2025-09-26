import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

import { useSettings } from './useSetting';
import { useUpdateSetting } from './useUpdateSetting';

const UpdateSettingsForm = () => {
  const {
    isLoading,
    settings: {
      breakfastPrice,
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
    } = {},
  } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  const handleUpdate = (e, fieldName) => {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [fieldName]: value });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          defaultValue={minBookingLength}
          disabled={isUpdating}
          id='min-nights'
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
          type='number'
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          id='max-nights'
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
          type='number'
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          id='max-guests'
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
          type='number'
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          id='breakfast-price'
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
          type='number'
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
