import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdateUser } from './useUpdateUser';

const UpdatePasswordForm = () => {
  const { formState, getValues, handleSubmit, register, reset } = useForm();
  const { errors } = formState;

  const { isUpdating, updateUser } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        error={errors?.password?.message}
        label='New password (min 8 chars)'
      >
        <Input
          autoComplete='current-password'
          disabled={isUpdating}
          id='password'
          type='password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.passwordConfirm?.message}
        label='Confirm password'
      >
        <Input
          autoComplete='new-password'
          disabled={isUpdating}
          id='passwordConfirm'
          type='password'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
};

export default UpdatePasswordForm;
