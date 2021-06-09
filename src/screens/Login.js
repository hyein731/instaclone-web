import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import FormError from "../components/auth/FormError";
  
const FacebookLogin = styled.div`
    color: #385285;
    span {
      margin-left: 10px;
      font-weight: 600;
    }
`;
  
function Login() {
    const { register, handleSubmit, errors, formState } = useForm({
        mode: "onChange", // onBlur
    });
    const onSubmitValid = (data) => {
        // console.log(data);
    };
    // console.log(errors, formState.isValid);
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
            <div>
                <FontAwesomeIcon icon={faInstagram} size="3x" />
            </div>
            <form onSubmit={handleSubmit(onSubmitValid)}>
                <Input 
                    ref={register({
                        // required: true,
                        required: "Username is required.",
                        minLength: {
                            value: 5,
                            message: "Username should be longer than 5 characters",
                        },
                        // pattern: "", // 정규식
                        // validate: (currentValue) => currentValue.includes("potato"),
                    })} 
                    name="username" 
                    type="text" 
                    placeholder="Username"
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
                    hasError={Boolean(errors?.password?.message)}
                />
                <FormError message={errors?.password?.message} />
                <Button type="submit" value="Log in" disabled={!formState.isValid} />
            </form>
            <Separator />
            <FacebookLogin>
                <FontAwesomeIcon icon={faFacebookSquare} />
                <span>Log in with Facebook</span>
            </FacebookLogin>
          </FormBox>
          <BottomBox cta="Don't have an account?" link={routes.signUp} linkText="Sign up" />
        </AuthLayout>
    );
}
export default Login;