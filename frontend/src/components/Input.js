import styles from "../styles/input.module.css";
import { useState } from "react";

export default function Input({ inputRef, inputName, inputType, initialValue, className, children }) {
  const inputFieldClasses = className ? `${className} ${styles.inputField}` : styles.inputField;
  const labelClasses = className ? `${className} ${styles.label}` : styles.label;
  const inputClasses = className ? `${className} ${styles.input}` : styles.input;
  const inputFilledClasses = className ? `${className} ${styles.inputFilled}` : styles.inputFilled;
  const [isInputFilled, setIsInputFilled] = useState(!!initialValue);

  function handleOnBlur(e) {
    e.target.value.length ? setIsInputFilled(true) : setIsInputFilled(false);
  }

  return (
    <div className={inputFieldClasses}>
      <input
        className={inputClasses}
        ref={inputRef}
        onBlur={handleOnBlur}
        name={inputName}
        type={inputType}
        defaultValue={initialValue}
      />
      <label className={`${labelClasses} ${isInputFilled ? inputFilledClasses : ""}`}>{children}</label>
    </div>
  );
}
