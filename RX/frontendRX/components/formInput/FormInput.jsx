import "./FormInput.css"
import React from 'react';

function FormInput(props) {
    const { label, onChange, errorMessage, isSubmit, isValid, checkFunction, ...inputProps } = props;

    return (
    <div className={props.location}>
        <label className="form-label">{label}</label>
        <input className={`form-control ${ isSubmit ? (isValid ? "input-valid" : "input-invalid") : ""}`} {...inputProps} onChange={onChange} />
        <span className={ isSubmit ? (isValid ? "validMessage" : "invalidMessage") : ""}>
            { isSubmit ? (isValid ? "looks good!" : errorMessage) : ""}
        </span>
    </div>
  )
}

export default FormInput;