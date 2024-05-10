import React from 'react'
import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from "lottie-react"
import animationValidData from "../../images/Animation - 1712011537898.json"
import animationFailedData from "../../images/Animation - 1715020404389.json"

import "./popup.css"


export function ValidPopup(props) {

  const popupRef = useRef();
  const {onClose, ...formData} = props;
  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  }

  return ( 
    <div ref={popupRef} onClick={closePopup} className="popup-style">
        <div className='popup-info'>
          <button className="close-button" onClick={onClose}>
            <CloseIcon fontSize='large' style={{color: 'white'}}/>
          </button>
          <div>
            <h1 style={{color: "white"}}>SESSION CREATED SUCCESSFULLY!</h1>
            <ul className='data-list'>
              <li>Session name: '{formData.name}'</li>
              <li>server ip: '{formData.serverIP}'</li>
              <li>port number: {formData.port}</li>
              <li>server port number: {formData.servePort}</li>
              <li>path: '{formData.path}'</li>
              <li>Chunk size: {formData.chunkSize}</li>
              <li>Symbol size: {formData.symbolSize}</li>
              <li>Overhead: {formData.overhead}</li>
            </ul>
          </div>
          <Lottie className="animation" animationData={animationValidData}></Lottie>
        </div>
    </div>
  )
}



export function FailedPopup(props) {

  const popupRef = useRef();
  const {onClose, errorsMsg} = props;
  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  }

  return ( 
    <div ref={popupRef} onClick={closePopup} className="popup-style">
        <div className='popup-info' style={{padding: '4% 0%'}}>
          <button className="close-button" onClick={onClose}>
            <CloseIcon fontSize='large' style={{color: 'white'}}/>
          </button>
          <div>
            <h1 style={{color: "white"}}>SESSION CREATION FAILED</h1>
            <h5 style={{color: "white"}}>some server errors:</h5>
            <ul className='data-list'>
              {
                errorsMsg.map((msg, index) => {
                  return <li key={index}>{msg}</li>;
                })
              }
            </ul>
            <h4>Please try again...</h4>
          </div>
          <Lottie className="animation-failed" animationData={animationFailedData}></Lottie>
        </div>
    </div>
  )
}
