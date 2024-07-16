import { useContext, createContext, useState } from "react";
const AuthContext =  createContext();
// import { useNavigate } from "react-router-dom";


const AuthProvider = ({children}) => {
    const [teacher, setTeacher] = useState(localStorage.getItem("teacher") || false);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    // const navigate = useNavigate();

    const login = async ({data}) => {
        setTeacher(true);
        setToken(data.data.access);
        localStorage.setItem("teacher", true);
        localStorage.setItem("site", data.data.access);
        // navigate("/dashboard");
    };

    const logout = () => {
        setTeacher(false);
        setToken("");
        localStorage.removeItem("site");
        localStorage.removeItem("teacher");
        window.location.reload();
        // navigate("/login");
    };

    return <AuthContext.Provider value={{ token, teacher, login, logout }}>
            {children}
            </AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
