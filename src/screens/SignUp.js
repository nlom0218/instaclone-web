import { useMutation } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Input from '../components/auth/Input';
import PageTitle from '../components/PageTitle';
import { FatLink } from '../components/shared';
import routes from '../routes';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;  
  margin-top: 10px;
`

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName,
      lastName: $lastName,
      username: $username,
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`


const SignUp = () => {
  const { register, handleSubmit, formState: { errors, isValid }, setError, clearErrors, trigger, getValues } = useForm({ mode: "onChange" })
  const history = useHistory()
  const onCompleted = (data) => {
    const { createAccount: { ok, error } } = data
    const { username, password } = getValues()
    if (!ok) {
      setError("result", {
        message: error
      })
      return
    }
    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password
    })
  }
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted })

  const onSubmit = (data) => {
    if (loading) {
      return
    }
    createAccount({
      variables: {
        ...data
      }
    })
  }

  const clearLoginAndSignError = () => {
    if (errors.result) {
      clearErrors("result")
      trigger()
    }
  }

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("firstName", { required: "First Name is required.", validate: clearLoginAndSignError })}
            type="text"
            placeholder="First Name"
            autoComplete="off"
            hasError={Boolean(errors?.firstName?.message)}
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            {...register("lastName", { validate: clearLoginAndSignError })}
            type="text"
            placeholder="Last Name"
            autoComplete="off"
          />
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars."
              },
              validate: clearLoginAndSignError
            })}
            type="text"
            placeholder="Username"
            autoComplete="off"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("email", { required: "Email is required.", validate: clearLoginAndSignError })}
            type="text"
            placeholder="Email"
            autoComplete="off"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("password", { required: "Password is required.", validate: clearLoginAndSignError })}
            type="password"
            placeholder="Password"
            autoComplete="off"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta="Have an account?"
        link={routes.home}
        linkText="Log In"
      />
    </AuthLayout>
  );
}

export default SignUp;