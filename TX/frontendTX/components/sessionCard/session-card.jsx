// here is the card that will display each session at the session panel
import "./session-card.css";

function SessionCard(props) {
    const session = props.session;
    return (
        <div className="card">
            <h1 style={{marginBottom: "5%", fontSize: '25px', fontFamily: 'cursive', color: 'black'}}><u>{session.session_name}</u></h1>
            <ul>
              <li><strong>Server ip:</strong> '{session.remote_server_ip}'</li>
              <li><strong>Port number:</strong> {session.port_number}</li>
              <li><strong>Server port number: </strong> {session.server_port_number}</li>
              <li><strong>Path:</strong> '{session.path}'</li>
              <li><strong>Chunk size:</strong> {session.chunk_size}</li>
              <li><strong>Symbol size:</strong> {session.symbol_size}</li>
              <li><strong>Overhead:</strong> {session.overhead}</li>
            </ul>
        </div>
    );
}

export default SessionCard;