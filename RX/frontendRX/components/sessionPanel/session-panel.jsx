import axios from 'axios';

import "./session-panel.css";
import { useState } from "react";
import { SendButton } from "../muiButtons/buttons.jsx";
import FormInput from "../formInput/FormInput.jsx";
import Popup from "../popup/popup.jsx";


export default function SessionPanel() {

    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        serverIP: '',
        port: '',
        path: ''
    });

    // check if needed to add another useState in order to capture the validation to each attribute.
    const [validation, setValidation] = useState({
        serverIP: false,
        port: false,
        path: false
    });

    const validaitonChecking = (obj) => {
        return Object.values(validation).every(value => value === true);
    }

    const [formSubmitted, setFormSubmitted] = useState(false);
    
    const inputs = [
        {
            id: 1,
            name: "serverIP",
            type: "text",
            placeholder: "Enter server IP",
            label: "Server IP:",
            location: "col-md-6",
            errorMessage: "Please enter a valid IP address.",
            required: true,
            checkFunction: checkIpAddress
        },
        {
            id: 2,
            name: "port",
            type: "number",
            placeholder: "Enter port number",
            label: "Port Number:",
            location: "col-md-6",
            errorMessage: "Port number must be between 1 and 65535.",
            required: true,
            checkFunction: checkPortNumber
        },
        {
            id: 3,
            name: "path",
            type: "text",
            placeholder: "Enter path",
            label: "Path:",
            location: "col-md-12",
            errorMessage: "Please provide a valid file or directory path.",
            required: true,
            checkFunction: checkPath
        }
    ];

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: e.target.value });

        const isValid = inputs[e.target.id - 1].checkFunction(value);
        console.log(`name: ${name}, value: ${value}, isValid: ${isValid}`);

        if (isValid != validation[name]) {
            console.log('the valid value changed...');
            setValidation({...validation, [name]: isValid})
        }
    }

    const onSubmit = (e) => {
        console.log("Button clicked!");
        // check the validation
        if (validaitonChecking(validation)) {

            // sending the data to server with axios- HTTP request
            axios.post('http://localhost:3001/session/newsession', formData)
            .then(function (response) {
                console.log("The session opened successfully!");
                console.log(response);
                //showing popup window to user:
                setShowPopup(true);
            })
            .catch(function (error) {
                console.log("There are some errors while opening the session...");
                console.log(error);
            });
        }
        else {
            setFormSubmitted(true);
        }
    }

    console.log(formData);
    console.log(validation);
    
    return (
        <div className="session-panel-container">
            <h1>Welcome to the RX <strong>Session Panel</strong>!</h1>
            <h4>Please fill the following fields:</h4>
            <div className="session-info">
                <form id="sessionForm" className="row g-4">

                    {inputs.map((input) => (
                        
                        <FormInput 
                            key={input.id}
                            onChange={onChange}
                            value={formData[input.name]}
                            isSubmit={formSubmitted}
                            isValid={validation[input.name]}
                            {...input} />
                    ))}

                </form>
                <div className="centerButton">
                    <SendButton text="create a new session" onClick={onSubmit} name="submit"/>
                    {/* <span className="submitButton" type="submit">Create new session</span> */}
                </div>
                {showPopup && <Popup {...formData} onClose={() => setShowPopup(false)}/>}
            </div>
        </div>
    );
}


function checkIpAddress(ip) {
    // Regular expression to validate IP address
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

function checkPortNumber(port) {
    // Regular expression to validate port number
    const portRegex = /^(?:(?:1\d{3}|[1-9]\d{0,3})|(?:(?:[1-5]?\d{4})|(?:[1-5]\d{3})|(?:[1-6]\d{2})|(?:[1-6]\d)|(?:[1-5]))|(?:(?:6[0-4]\d{2})|(?:65[0-4]\d)|(?:655[0-2])|(?:6553[0-5])))$/;
    return portRegex.test(port);
}

function checkPath(path) {
    return path != '';
}



// function submit()
// {
//     let submit = true;
//     console.log("the button clicked!");
//     // let err = {
//     //     serverIp: null,
//     //     port: null,
//     //     path: null,
//     //     chunkSize: null,
//     //     symbolSize: null,
//     //     overhead: null,
//     //     success: true
//     // };

//     clearErrors();
//     let form = document.querySelector("#sessionForm");
//     let inpList = form.querySelectorAll("input");
//     console.log("input: " + inpList);
//     console.log("0: " + inpList[0].value);
//     console.log("1: " + inpList[1].value);
//     if (!checkIpAddress(formData[serverIP])) submit = false;
//     if (!checkPortNumber(inpList[1].value)) err = {...err, epass: "Password must conatian at least 1 small letter, 1 capital letter, 1 number and 1 special char", success: false};
    
    
//     if (readySend/*1*/){
//         // send data to backend
//         axios.post('/session/newsession', {
//             email: inpList[0].value,
//             pass: inpList[1].value,
//         })
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log("error");
//             renderErrors(error.response.data);
//         });
//     } else {
//         renderErrors(err);
//     }
// }


// function renderErrors(err) {
//     console.log("err: " + err);
//     for (key in err){
//         if(err[key] != null && key != "success"){
//             console.log("#" + key);
//             let tmp = document.querySelector("#" + key);
//             tmp.innerText = err[key];
//             tmp.classList.remove("hide");
//         }
//     }
// }


// function clearErrors() {
//     let form = document.querySelector("#sessionForm");
//     let errList = form.querySelectorAll(".error");
//     errList.forEach((inp) => {
//         inp.innerText = "";
//         inp.classList.add("hide");
//     })
// }


// function checkIpAddress(ip) {
//     return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip); 
// } 







// // email validation
// function ValidateEmail(input) {
//   let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   return input.match(validRegex);
// }

// // password validation
// function ValidatePass(input) {
//   let validRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
//   return input.match(validRegex);
// }

// function checkIpAddress(ip) { 
//     const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
//     return ipv4Pattern.test(ip);
// }


// function checkingForm()
// {
//     var forms = document.querySelectorAll(".needs-validation");
//     Array.prototype.slice.call(forms).forEach(form)( function (form) {
//         form.addEventListener("submit", function(event) {
//             if (!form.checkValidity())
//             {            
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//             form.classList.add("was-validated")
//         }, false);
//     })
// }
