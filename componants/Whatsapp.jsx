import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
const Whatsapp = () => {
    return (
        <div style={{ position: 'fixed', zIndex: '9999', bottom: '0px', right: "0" }}>
            <a href="https://api.whatsapp.com/send?phone=201558807773" aria-label='WhatsApp' target="_blank" rel="noreferrer">
                <div className='d-flex align-items-center justify-content-center' style={{ width: '65px', height: '65px', borderRadius: '50%', backgroundColor: '#3a4c8d', margin: "30px" }}>
                    <FontAwesomeIcon icon={faWhatsapp} style={{ color: 'white', fontSize: '40px' }}></FontAwesomeIcon>
                </div>
            </a>
        </div>
    )
}

export default Whatsapp