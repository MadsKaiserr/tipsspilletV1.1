import { useLocation, Navigate, Outlet } from "react-router-dom";
import { resetUserSession } from "./authService.js"
import jwtDecode from "jwt-decode";
// import Velkommen from '../components/modals/velkommen/velkommen';
// import KillSwitch from '../components/killswitch/killswitch';
// import ClearHeader from '../components/reusables/clearheader';

const RequireAuth = () => {
    const location = useLocation();
    if (localStorage.getItem("auth")) {
        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
    
        var decodedToken = jwtDecode(authToken);
        var todayTime = new Date().getTime();
        var todayMS = todayTime/1000;
        
        if (decodedToken.exp > todayMS) {
            if (localStorage.getItem("velkommen") === "now") {
                // return [<ClearHeader />, <KillSwitch />]
                return [<Outlet />]
            } else {
                // return [<ClearHeader />, <KillSwitch />]
                return <Outlet />
            }
        } else {
            resetUserSession();
            return (
                <Navigate to="/" state={{ from: location}} replace />
            );
        }
    } else {
        return (
            <Navigate to="/signup" state={{ from: "/"}} replace />
        );
    }
}

export default RequireAuth;