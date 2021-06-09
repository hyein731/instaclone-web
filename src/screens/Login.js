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
  
const FacebookLogin = styled.div`
    color: #385285;
    span {
      margin-left: 10px;
      font-weight: 600;
    }
`;
  
function Login() {
    const { register, watch, handleSubmit } = useForm();
    const onSubmitValid = (data) => {
        console.log(data);
    };
    const onSubmitInvalid = (data) => {
        console.log(data, "invalid");
    };
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
            <div>
                <FontAwesomeIcon icon={faInstagram} size="3x" />
            </div>
            <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                <Input 
                    ref={register({
                        // required: true,
                        required: "Username is required.",
                        minLength: 5,
                        // pattern: "", // 정규식
                        // validate: (currentValue) => currentValue.includes("potato"),
                    })} 
                    name="username" 
                    type="text" 
                    placeholder="Username"
                />
                <Input
                    ref={register({
                        required: "Password is required.",
                    })}
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <Button type="submit" value="Log in"/>
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