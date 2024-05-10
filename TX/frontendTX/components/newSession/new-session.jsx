import axios from 'axios';

import "./new-session.css";
import { useState, useEffect } from "react";
import { SendButton } from "../muiButtons/buttons.jsx";
import {FormInput, FormSelect} from "../formInput/FormInput.jsx";
import {ValidPopup, FailedPopup} from "../popup/popup.jsx";
    

export default function NewSession() {

    const [showValidPopup, setShowValidPopup] = useState(false);
    const [showFailedPopup, setShowFailedPopup] = useState(false);
    const [serverErrorsMsg, setServerErrorsMsg] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        serverIP: '',
        port: '',
        serverPort: '',
        path: '',
        chunkSize: '10000',
        symbolSize: '1000',
        overhead: '500'
    });

    // check if needed to add another useState in order to capture the validation to each attribute.
    const [validation, setValidation] = useState({
        name:false,
        serverIP: false,
        port: false,
        serverPort: false,
        path: false,
        chunkSize: true,
        symbolSize: true,
        overhead: true
    });

    const [txPortsList, setTxPortsList] = useState([]);
    const [rxPortsList, setRxPortsList] = useState([]);

    useEffect(() => {
        // Fetch the first list of numbers from the backend when the component mounts
        axios.get('http://localhost:3000/session/txports')
          .then(response => setTxPortsList(response.data.map(obj => Object.values(obj)[0])))
          .catch(error => console.error('Error fetching TX port numbers:', error));

        // Fetch the second list of numbers from the backend when the component mounts
        axios.get('http://localhost:3000/session/rxports')
        .then(response => setRxPortsList(response.data.map(obj => Object.values(obj)[0])))
        .catch((error) => console.error('Error fetching RX port numbers:', error));
      }, []);


    const validaitonChecking = (obj) => {
        return Object.values(validation).every(value => value === true);
    }

    const [formSubmitted, setFormSubmitted] = useState(false);
    
    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Enter the session name",
            label: "Session name:",
            location: "col-md-9",
            errorMessage: "The session name should be up to 20 characters.",
            required: true,
            checkFunction: checkSessionName
        },
        {
            id: 2,
            name: "serverIP",
            type: "text",
            placeholder: "Enter server IP",
            label: "Server IP:",
            location: "col-md-4",
            errorMessage: "Please enter a valid IP address.",
            required: true,
            checkFunction: checkIpAddress
        },
        {
            id: 3,
            name: "port",
            type: "number",
            placeholder: "Enter port number",
            label: "Port Number (TX):",
            location: "col-md-4",
            errorMessage: "Please select one of the port numbers options.",
            required: true,
            // portsList: [8080, 8000, 9000, 7070, 6060, 5050, 3005, 1234, 2222, 3333],
            checkFunction: checkPortNumber
        },
        {
            id: 4,
            name: "serverPort",
            type: "number",
            placeholder: "Enter server port number",
            label: "Port Number (RX):",
            location: "col-md-4",
            errorMessage: "Please select one of the port numbers options.",
            required: true,
            // portsList: [8888, 9999, 4444, 5555, 6666, 7777, 9876, 8765, 6543, 3456],
            checkFunction: checkPortNumber
        },
        {
            id: 5,
            name: "path",
            type: "text",
            placeholder: "Enter path",
            label: "Path:",
            location: "col-md-12",
            errorMessage: "Please provide a valid file or directory path.",
            required: true,
            checkFunction: checkPath
        },
        {
            id: 6,
            name: "chunkSize",
            type: "number",
            placeholder: "Enter chunk size",
            label: "Chunk Size:",
            location: "col-md-4",
            errorMessage: "Chunk size must be between 1 and 1,000,000.",
            checkFunction: checkChunkSize
        },
        {
            id: 7,
            name: "symbolSize",
            type: "number",
            placeholder: "Enter symbol size",
            label: "Symbol Size:",
            location: "col-md-4",
            errorMessage: "Symbol size must be between 1 and 100,000.",
            checkFunction: checkSymbolSize
        },
        {
            id: 8,
            name: "overhead",
            type: "number",
            placeholder: "Enter overhead",
            label: "Overhead:",
            location: "col-md-4",
            errorMessage: "Overhead must be between 1 and 5,000.",
            checkFunction: checkOverhead
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
            axios.post('http://localhost:3000/session/newsession', formData)
            .then(function (response) {
                console.log("The session opened successfully!");
                console.log(response);
                //showing popup window to user:
                setShowValidPopup(true);
            })
            .catch(function (error) {
                console.log("There are some errors while opening the session...");
                console.log(error.response.data);
                setServerErrorsMsg(error.response.data);
                setShowFailedPopup(true);
            });
        }
        else {
            setFormSubmitted(true);
        }
    }

    const handleCloseValidPopup = () => {
        setShowValidPopup(false);
        // Reload the page when the popup is closed
        window.location.reload();
    };

    const handleCloseFailedPopup = () => {
        setShowFailedPopup(false);
        // Reload the page when the popup is closed
        window.location.reload();
    };

    console.log(formData);
    console.log(validation);
    
    return (
        <div className="session-panel-container">
            <h1>Welcome to the TX <strong>session creation</strong> page!</h1>
            <h4>Please fill the following fields:</h4>
            <div className="session-info">
                <form id="sessionForm" className="row g-3">

                    {inputs.map((input) => (
                        (input.id === 3 || input.id === 4) ? (
                            <FormSelect 
                                key={input.id}
                                onChange={onChange}
                                isSubmit={formSubmitted}
                                isValid={validation[input.name]}
                                portsList={ (input.id===3) ? txPortsList : rxPortsList }
                                {...input}
                            />

                        ) : (
                            <FormInput 
                                key={input.id}
                                onChange={onChange}
                                value={formData[input.name]}
                                isSubmit={formSubmitted}
                                isValid={validation[input.name]}
                                {...input}
                            />
                        )
                    ))}

                </form>
                <div className="centerButton">
                    <SendButton text="create a new session" onClick={onSubmit} name="submit"/>
                    {/* <span className="submitButton" type="submit">Create new session</span> */}
                </div>
                {showValidPopup && <ValidPopup {...formData} onClose={handleCloseValidPopup}/>}
                {showFailedPopup && <FailedPopup errorsMsg={serverErrorsMsg} onClose={handleCloseFailedPopup}/>}
            </div>
        </div>
    );
}

function checkSessionName(name) {
    return (name != '' && name.length <= 20);
}


function checkIpAddress(ip) {
    // Regular expression to validate IP address
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

function checkPortNumber(port) {
    // Regular expression to validate port number
    // const portRegex = /^(?:(?:1\d{3}|[1-9]\d{0,3})|(?:(?:[1-5]?\d{4})|(?:[1-5]\d{3})|(?:[1-6]\d{2})|(?:[1-6]\d)|(?:[1-5]))|(?:(?:6[0-4]\d{2})|(?:65[0-4]\d)|(?:655[0-2])|(?:6553[0-5])))$/;
    // return portRegex.test(port);
    return port != '';
}

function checkPath(path) {
    return path != '';
}

function checkChunkSize(chunkSize) {
    return (chunkSize > 0 && chunkSize <= 1000000);
}


function checkSymbolSize(symbolSize) {
    return (symbolSize > 0 && symbolSize <= 100000);
}

function checkOverhead(overhead) {
    return (overhead > 0 && overhead <= 5000);
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
