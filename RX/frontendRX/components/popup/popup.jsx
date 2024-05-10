import React from 'react'
import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from "lottie-react"
import animationData from "../../images/Animation - 1712011537898.json"

import "./popup.css"

function Popup(props) {

  const popupRef = useRef();
  const {onClose, ...formData} = props;
  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  }


//   const [formData, setFormData] = useState({
//     serverIP: '1.1.1.1',
//     port: '5',
//     path: 'file',
//     chunkSize: '10000',
//     symbolSize: '1000',
//     overhead: '500'
// });

  return ( 
    <div ref={popupRef} onClick={closePopup} className="popup-style">
        <div className='popup-info'>
          <button className="close-button" onClick={onClose}><CloseIcon fontSize='large' style={{color: 'white'}}/></button>
          <div>
            <h1 style={{color: "white"}}>SESSION CREATED SUCCESSFULLY!</h1>
            <ul className='data-list'>
              <li>server ip: '{formData.serverIP}'</li>
              <li>port number: {formData.port}</li>
              <li>path: '{formData.path}'</li>
              <li>Chunk size: {formData.chunkSize}</li>
              <li>Symbol size: {formData.symbolSize}</li>
              <li>Overhead: {formData.overhead}</li>
            </ul>
          </div>
          <Lottie className="animation-tick" animationData={animationData}></Lottie>
        </div>
    </div>
  )
}

export default Popup;
