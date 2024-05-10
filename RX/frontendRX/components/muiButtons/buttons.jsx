import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import "./buttons.css";

export function SendButton(props) {
    return(
        <Button variant="contained" endIcon={<SendIcon />} onClick={props.onClick} >
                {props.text}
        </Button>
    );
}
