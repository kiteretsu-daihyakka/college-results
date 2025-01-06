import {Navigate, useLocation} from "react-router-dom"
import {useAuth} from "../../hooks/AuthProvider";

const ProtectedRoute = ({children}) => {
    const auth = useAuth();
    let location = useLocation();

    if(!auth.teacher) {
        return <Navigate to="/teacher-login" state={{ from: location}} replace />
    }
    return children;

};

export default ProtectedRoute;
