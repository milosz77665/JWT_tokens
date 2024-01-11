import styles from "@/styles/login/form.module.css";
import buttonStyles from "@/styles/button.module.css";
import loadingSpinnerStyles from "@/styles/loadingSpinner.module.css";
import Button from "../Button";
import Input from "../Input";
import ValidationMessage from "../ValidationMessage";
import { useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function SignInForm({ setHasAccount }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [authErrorMess, setAuthErrorMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();
    authErrorMess ? setAuthErrorMess("") : null;
    setIsLoading(true);
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (username) {
      if (password) {
        if (password.length >= 6) {
          try {
            const loginData = { username, password };
            const response = await fetch("http://localhost:5000/login", {
              method: "POST",
              body: JSON.stringify(loginData),
              headers: { "Content-Type": "application/json" },
            });
            const responseJson = await response.json();
            console.log(responseJson);
          } catch (error) {
            setAuthErrorMess("Unknown error");
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
      setAuthErrorMess("Username is missing");
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2 className={styles.title}>Sign in</h2>
      {isLoading ? (
        <LoadingSpinner className={loadingSpinnerStyles.form} />
      ) : (
        <>
          <form className={styles.form} onSubmit={handleSignIn}>
            <div className={styles.inputSection}>
              {authErrorMess && <ValidationMessage>{authErrorMess}</ValidationMessage>}
              <Input inputRef={usernameRef} inputName="username" inputType="username">
                Username
              </Input>
              <Input inputRef={passwordRef} inputName="password" inputType="password">
                Password
              </Input>
            </div>
            <Button className={buttonStyles.formButton}>Sign in</Button>
          </form>
        </>
      )}
    </>
  );
}
