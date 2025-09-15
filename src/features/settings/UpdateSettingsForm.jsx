import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

import { useSettings } from './useSetting';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  function handleUpdate(e, fieldName) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [fieldName]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          defaultValue={minBookingLength}
          disabled={isUpdating}
          type='number'
          id='min-nights'
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          type='number'
          id='max-nights'
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          type='number'
          id='max-guests'
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          type='number'
          id='breakfast-price'
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
