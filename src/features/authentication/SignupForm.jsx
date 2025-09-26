import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useSignup } from './useSignup';

const SignupForm = () => {
  const { formState, getValues, handleSubmit, register, reset } = useForm();
  const { isPending, signup } = useSignup();

  const { errors } = formState;

  const onSubmit = ({ fullName, email, password }) => {
    signup({ fullName, email, password }, { onSettled: reset });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors?.fullName?.message} label='Full name'>
        <Input
          disabled={isPending}
          id='fullName'
          type='text'
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow error={errors?.email?.message} label='Email address'>
        <Input
          id='email'
          disabled={isPending}
          type='email'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.password?.message}
        label='Password (min 8 characters)'
      >
        <Input
          disabled={isPending}
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

      <FormRow error={errors?.passwordConfirm?.message} label='Repeat password'>
        <Input
          id='passwordConfirm'
          disabled={isPending}
          type='password'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Password needs to match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isPending}
          onClick={reset}
          type='reset'
          variation='secondary'
        >
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
