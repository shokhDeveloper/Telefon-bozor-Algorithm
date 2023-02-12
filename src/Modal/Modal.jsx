export const Modal = ({children, title, modal, setModal}) => {
    const styleOverlay = {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "rgba(0, 0, 0, 0.4)",
        display: modal !== true? "none": "flex",
        alignItems: "center", 
        justifyContent: "center" 
    }
    const modalStyle = {
        background : "#fff",
        color: "#000",
        padding: "1rem"
    }
    return(
        <div className="overlay" style={styleOverlay}>
            <div className="modal" style={modalStyle}>
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    )
}