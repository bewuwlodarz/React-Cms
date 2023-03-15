import Button from "../button/button.component";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFormAuth,
  signInWithGooglePopUp,
  signInUserWithEmailAndPassword,
} from "../../utlis/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInForm = () => {
  const [formFields, setFormFileds] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFileds = () => {
    setFormFileds(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopUp();
    await createUserDocumentFormAuth(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFileds({ ...formFields, [name]: value });

    console.log(formFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("user", formFields);
    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password or email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
      if (error.code === "auth/wrong-password") {
        alert("incorect password for email");
      }
    }
    resetFormFileds();
  };
  return (
    <div className="sign-up-contaier">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
