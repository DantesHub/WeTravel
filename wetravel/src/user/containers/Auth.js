import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hooks";
import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );
  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.Inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  //form that renders email and password field
  return (
    <Card className='authentication'>
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Your name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name'
            onInput={inputHandler}
          />
        )}
        <Input
          id='email'
          element='input'
          type='email'
          label='Email'
          errorText='please enter a valid email address.'
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Input
          id='password'
          element='input'
          type='password'
          label='Password'
          errorText='please enter a valid password, at least 5 characters.'
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGN-UP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Change to {isLoginMode ? "SIGN-UP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
