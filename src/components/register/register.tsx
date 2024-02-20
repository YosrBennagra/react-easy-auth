import { Button } from "baseui/button";
import { Input } from "baseui/input";
import styled from "styled-components";
import * as Yup from 'yup';
import React from "react";


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

function Register(props: any) {
    const goToLogin = ()=>{navigate("/login")}
    const signIn = useSignIn();
    const navigate = useNavigate();
    const validate = (values: any) => {
        const errors: any = {};
        if (!values.firstName) {
            errors.firstName = "Required";
        } else if (values.firstName.length > 15) {
            errors.firstName = "Must be 15 characters or less";
        }

        if (!values.lastName) {
            errors.lastName = "Required";
        } else if (values.lastName.length > 20) {
            errors.lastName = "Must be 20 characters or less";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }

        return errors;
    };

    const SignupForm = () => {
        const formik = useFormik({
            initialValues: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                phone : '',
            },
            validate,
            onSubmit: async (values) => {
                const { passwordConfirmation, ...valuesToSend } = values;
                const response = await axios.post(`http://localhost:7000/users`,valuesToSend);
                console.log(JSON.stringify(values, null, 2));
            }
        });

        return (
            <>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                <br />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
                {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                <br />
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <br />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                <br />
                <label htmlFor="passwordConfirmation">Password Confirmation </label>
                <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="passwordConfirmation"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                />
                {formik.errors.passwordConfirmation ? <div>{formik.errors.passwordConfirmation}</div> : null}
                <br />
                <label htmlFor="phone">Phone Number </label>
                <input
                    id="phone"
                    name="phone"
                    type="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
                {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
                <br />
                <button type="submit">Register</button>
            </form>
            <button onClick={goToLogin}>Login</button>
            </>
        );
    };

    return <SignupForm />;
}

export { Register };
    function setError(arg0: string) {
        throw new Error("Function not implemented.");
    }

