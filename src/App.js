import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css"
import { Context } from "./Context";
import { Home } from "./Private";
import { About,  Login, Register } from "./Public";
import { Home as Not } from "./Public";
import { Home_Page } from "./Public";
function App() {
  const {token} = useContext(Context)
  return (
    <div className="App">   
      <Routes>
        {token !== null? 
        <>
          <Route path="/*" element={<Home/>}>
          </Route>
          <Route path="*" element={<Navigate to={"/"} replace={true}/>}/>
        </>: 
        <>
          <Route path="/*" element={<Not/>}>
          <Route index element={<Home_Page/>}/>
            <Route path="home" element={<Home_Page/>}/>
            <Route path="about" element={<About/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<Navigate to={"/login"} replace={true}/>}/>
        </> }
      </Routes>
    </div>
  );
}
export default App;
