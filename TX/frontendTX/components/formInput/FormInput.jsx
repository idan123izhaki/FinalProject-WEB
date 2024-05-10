import "./FormInput.css"
import React from 'react';

export function FormInput(props) {
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

export function FormSelect(props) {
    const {portsList, onChange, label, errorMessage, isSubmit, isValid, checkFunction, ...selectProps} = props;
    console.log("ports list: ", portsList);
    return (
        <div className={props.location}>
            <label className="form-label">{label}</label>
            <select className={`form-select ${ isSubmit ? (isValid ? "input-valid" : "input-invalid") : ""}`} {...selectProps} onChange={onChange}>
            <option value="" disabled selected>Select a port number</option>
            {portsList.map((option, index) => (
                <option key={index} value={option}>
                {option}
                </option>
            ))}
            </select>
            <span className={ isSubmit ? (isValid ? "validMessage" : "invalidMessage") : ""}>
                { isSubmit ? (isValid ? "looks good!" : errorMessage) : ""}
            </span>
        </div>
    );
}
