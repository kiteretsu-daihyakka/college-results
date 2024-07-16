import Button from "../Button";
import './TeacherLoginBtn.css';
import {useNavigate} from "react-router-dom";
import {adminTxt} from "../../Utils/Variables.js";
import { useAuth } from "../../hooks/AuthProvider";

function TeacherLoginBtn(props){
    const navi = useNavigate();
    function onLoginClick(){
        navi("/".concat(adminTxt.toLowerCase().concat("-login")));
    }
    return <Button onClick={onLoginClick} className={`TeacherLoginBtn ${props.className}`} type="button">Teacher Login</Button>
}
function TeacherLogoutBtn(props){
    const auth = useAuth();
    function onLogoutClick(){
        auth.logout();
        // navi("/");
    }
    return <Button onClick={onLogoutClick} className={`TeacherLogoutBtn ${props.className}`} type="button">Logout</Button>
}

export default TeacherLoginBtn
export {TeacherLogoutBtn}
