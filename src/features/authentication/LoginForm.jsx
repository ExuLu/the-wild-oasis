import { useState } from 'react';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

import { useLogin } from './useLogin';

const LoginForm = () => {
  const { isPending, login } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Email address'>
        <Input
          autoComplete='username'
          disabled={isPending}
          id='email'
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          value={email}
        />
      </FormRowVertical>
      <FormRowVertical label='Password'>
        <Input
          autoComplete='current-password'
          disabled={isPending}
          id='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isPending} size='large'>
          {!isPending ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
