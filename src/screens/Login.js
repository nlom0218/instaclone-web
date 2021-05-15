import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql, useMutation } from "@apollo/client";
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import PageTitle from '../components/PageTitle';
import routes from '../routes';
import { logUserIn } from '../apllo';

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`

const LOGIN_MUTATION = gql`
    mutation login($username:String!, $password:String!) {
        login(username:$username, password:$password) {
            ok
            token
            error
        }
    }
`

const Login = () => {

    const { register, handleSubmit, formState: { errors, isValid }, getValues, setError, clearErrors, trigger } = useForm({ mode: "onChange" })
    const onCompleted = (data) => {
        const { login: { ok, error, token } } = data
        if (!ok) {
            setError("result", {
                message: error
            })
        }
        if (token) {
            logUserIn(token)
        }
    }
    const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted })
    const onSubmit = (data) => {
        const { username, password } = getValues()
        login({
            variables: { username, password }
        })
    };

    const clearLoginError = () => {
        if (errors.result) {
            clearErrors("result")
            trigger()
        }
    }

    return (
        <AuthLayout>
            <PageTitle title="Log In" />
            <FormBox>
                <div><FontAwesomeIcon icon={faInstagram} size="3x" /></div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "Username should be longer than 5 chars."
                            },
                            validate: clearLoginError
                        })}
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        hasError={Boolean(errors?.username?.message)}
                    />
                    <FormError message={errors?.username?.message} />
                    <Input
                        {...register("password", {
                            required: "Password is required",
                            validate: clearLoginError
                        })}
                        type="password"
                        placeholder="Password"
                        hasError={Boolean(errors?.password?.message)}
                    />
                    <FormError message={errors?.password?.message} />
                    <Button type="submit" value={loading ? "Loading..." : "Log In"} disabled={!isValid || loading} />
                    <FormError message={errors?.result?.message} />
                </form>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                link={routes.signUp}
                linkText="Sign Up"
            />
        </AuthLayout>
    );
}

export default Login;