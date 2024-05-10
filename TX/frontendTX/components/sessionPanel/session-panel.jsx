import axios from 'axios';
import SessionCard from "../sessionCard/session-card";
import { useState, useEffect } from "react";

import "./session-panel.css";


export default function SessionPanel() {
    // sending get http request to get all the current sessions from DB
    const [currentSessions, setCurrentSessions] = useState([]);

    // Fetch all the sessions from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3000/session/allsessions')
          .then(function (response){
            console.log(response);
            setCurrentSessions(response.data);
          })
          .catch((error) => console.error('Error fetching all sessions:', error));
      }, []);


    return (
        <div className='session-panel-main-container'>
            <div className='titles-class'>
                <span style={{fontSize: '30px'}}><strong>Welcome to the session panel</strong></span>
                <span style={{fontSize: '20px'}}>here you can see all the avilable sessions at the system:</span>
            </div>
            <div className='cards-container'>
                {
                    currentSessions.map((value, index) => {
                        return <SessionCard key={value.id} session={value}/>
                    })
                }
            </div>
        </div>
    );
};
