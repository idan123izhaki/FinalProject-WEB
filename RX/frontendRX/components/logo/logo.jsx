import LineStyleIcon from '@mui/icons-material/LineStyle';

import "./logo.css"

export default function Logo() {
    return (
        <div className='border-spin'>
            <div className='outer-border'>
                <div className='spinning-border'></div>
                <div className='inner-border'>
                    <LineStyleIcon style={{ color: 'rgb(7,87,91)' }} />
                    <h1 style={{color: 'black', fontFamily: '-moz-initial'}}><strong>VDT</strong></h1>
                </div>
            </div>
        </div>
    );
}