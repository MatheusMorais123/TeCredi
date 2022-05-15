import React, { Children } from "react"
import './style.css'
const Modal = ({ onClose = () => {}, children}) => {
    return (
        <div className="content">
            <div className="container">
                <button className="close" onClick={onClose}>X</button>
                <div className="box">{children}</div>
            </div>
        </div>
    )
}
export default Modal