import { Button } from "antd"

export const ParentModal = ({modal, setModal, title, children}) => {
    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: modal !== true? "none": "block",
        background: "rgba(0,0,0,0.4)",
        zIndex: 1,
    }
    const parentModalStyle = {
        width: "30%",
        transform: modal !== true? "translateX(100%)": "translateX(0%)" ,
        height: "100vh",
        background: "#fff",
        zIndex: 1,
        position: "absolute",
        right: "0",
        transition: "0.5s ease all",
        overflowX: "scroll"
    }
    return(
        <div className="overlay" style={overlayStyle}>
            <div className="parentmodal" style={parentModalStyle}>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    setModal(!modal)
                }} type="primary">&times;</Button>
                </div>
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    )
}