import styles from "../../styles/login/form.module.css";
import buttonStyles from "@/styles/button.module.css";
import loadingSpinnerStyles from "@/styles/loadingSpinner.module.css";
import Button from "../Button";
import Input from "../Input";
import ValidationMessage from "../ValidationMessage";
import { useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function RegisterForm({ setHasAccount }) {
  const [authErrorMess, setAuthErrorMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatRef = useRef();

  async function handleRegister(e) {
    e.preventDefault();
    authErrorMess ? setAuthErrorMess("") : null;
    setIsLoading(true);
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (name && surname) {
      if (email) {
        if (password) {
          if (password.length >= 6) {
            if (email.match(/^[^s@]+@[^s@]+.[^s@]+$/)) {
              if (passwordRef.current.value === repeatRef.current.value) {
                try {
                  const registerData = { name, surname, email, password };
                  const response = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    body: JSON.stringify(registerData),
                    headers: { "Content-Type": "application/json" },
                  });
                  const responseJson = await response.json();
                  console.log(responseJson);
                } catch (error) {
                  setAuthErrorMess("Unknown error");
                  setIsLoading(false);
                }
              } else {
                setAuthErrorMess("Passwords are different");
                passwordRef.current.value = "";
                repeatRef.current.value = "";
                setIsLoading(false);
              }
            } else {
              setAuthErrorMess("Email is invalid");
              setIsLoading(false);
            }
          } else {
            setAuthErrorMess("Password is too short (6)");
            setIsLoading(false);
          }
        } else {
          setAuthErrorMess("Password is missing");
          setIsLoading(false);
        }
      } else {
        setAuthErrorMess("Email is missing");
        setIsLoading(false);
      }
    } else {
      setAuthErrorMess("Name and surname are mandatory");
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2 className={styles.title}>Register</h2>
      {isLoading ? (
        <LoadingSpinner className={loadingSpinnerStyles.form} />
      ) : (
        <>
          <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.inputSection}>
              {authErrorMess && <ValidationMessage>{authErrorMess}</ValidationMessage>}
              <Input inputRef={nameRef} inputName="name" inputType="text">
                Name*
              </Input>
              <Input inputRef={surnameRef} inputName="surname" inputType="text">
                Surname*
              </Input>
              <Input inputRef={emailRef} inputName="email" inputType="email">
                E-mail*
              </Input>
              <Input inputRef={passwordRef} inputName="password" inputType="password">
                Password*
              </Input>
              <Input inputRef={repeatRef} inputName="repeatPassword" inputType="password">
                Repeat password*
              </Input>
            </div>
            <Button className={buttonStyles.formButton}>Register</Button>
          </form>
          <p className={styles.text}>
            You already have an account?&nbsp;
            <a
              className={styles.link}
              onClick={() => {
                setHasAccount(true);
              }}
            >
              Sign in
            </a>
          </p>
        </>
      )}
    </>
  );
}
