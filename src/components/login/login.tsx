import { Button } from "baseui/button";
import { Input } from "baseui/input";
import styled from "styled-components";
import * as Yup from 'yup';
import {
  HeadingXXLarge,
  HeadingXLarge,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
} from "baseui/typography";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const onRegister = ( )=> {
    navigate("/register")
  }
  const onSubmit = async (values: any) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:7000/users?email=${values.email}&password=${values.password}`
        );
      const user = response.data[0];
      if (user) {
        signIn({
          token: user.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: values.email },
        });
        console.log(user);
        navigate("/")
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message || "An error occurred");
      else if (err && err instanceof Error) setError(err.message || "An error occurred");

      console.log("Error: ", err);
    }
  };
  const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

  const formik = useFormik({
    initialValues: {
      email: '',
      password:  '',
    },
    onSubmit,validationSchema: validationSchema,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>Welcome Back!</HeadingXXLarge>
          <ErrorText>{error}</ErrorText>
          <InputWrapper>
            <StyledInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              clearOnEscape
              size="large"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              clearOnEscape
              size="large"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
              Login
            </Button>
          </InputWrapper>{/* Login Btn */}
          <InputWrapper>
            <Button size="large" kind="primary" type="submit" onClick ={ onRegister }>
              Register
            </Button>
          </InputWrapper>{/* Register Btn */}
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Login };
