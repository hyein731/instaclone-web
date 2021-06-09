import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import FormError from "../components/auth/FormError";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            ok
            error
        }
    }
`;
  
function SignUp() {
    const history = useHistory();
    const { register, handleSubmit, errors, formState, setError, clearErrors, getValues } = useForm({
        mode: "onChange",
    });

    const onCompleted = (data) => {
        const { username, password } = getValues();
        const { createAccount: { ok, error }} = data;
        if (!ok) {
            return setError("result", {
                message: error,
            });
        }
        history.push(routes.home, {
            message: "Account created. Please log in.",
            username,
            password
        });
    }
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        createAccount({
            variables: {
                ...data,
            }
        });
    };
    const clearSignupError = () => {
        clearErrors("result");
    }
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
            <HeaderContainer>
              <FontAwesomeIcon icon={faInstagram} size="3x" />
              <Subtitle>
                Sign up to see photos and videos from your friends.
              </Subtitle>
            </HeaderContainer>
            <form onSubmit={handleSubmit(onSubmitValid)}>
              <Input 
                ref={register({
                  required: "First Name is required.",
                })}
                name="firstName" // Backend 형태와 맞추기!
                type="text"
                placeholder="First Name"
                onChange={clearSignupError}
                hasError={Boolean(errors?.firstName?.message)}
              />
              <FormError message={errors?.firstName?.message} />
              <Input 
                ref={register}
                name="lastName"
                type="text" 
                placeholder="Last Name" 
              />
              <Input
                ref={register({
                  required: "Email is required.",
                })}
                name="email"
                type="text"
                placeholder="Email" 
                onChange={clearSignupError}
                hasError={Boolean(errors?.email?.message)}
              />
              <FormError message={errors?.email?.message} />
              <Input
                ref={register({
                  required: "Username is required.",
                })}
                name="username"
                type="text"
                placeholder="Username" 
                onChange={clearSignupError}
                hasError={Boolean(errors?.username?.message)}
              />
              <FormError message={errors?.username?.message} />
              <Input
                ref={register({
                  required: "Password is required.",
                })}
                name="password"
                type="password"
                placeholder="Password"
                onChange={clearSignupError}
                hasError={Boolean(errors?.password?.message)}
              />
              <FormError message={errors?.password?.message} />
              <Button
                type="submit"
                value={ loading? "Loading..." : "Sign up" }
                disabled={!formState.isValid || loading}
              />
              <FormError message={errors?.result?.message} />
            </form>
          </FormBox>
          <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    );
}
export default SignUp;