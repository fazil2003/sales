import React from "react";
import './popup.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setTrigger(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup