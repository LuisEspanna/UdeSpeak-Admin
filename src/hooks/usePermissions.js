import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import constants from '../config/constants.json'


export default function usePermissions() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    

    useEffect(() => {
        if(user) {
            switch (user.permission) {
                case constants.PERMISSIONS_ADMIN:
                    setIsAdmin(true);
                    break;
                case constants.PERMISSIONS_TEACHER:
                    setIsTeacher(true);
                    break;
                case constants.PERMISSIONS_STUDENT:
                    setIsStudent(true);
                    break;
                default:
                    navigate("/first-setup", {replace: true});
                    break;
            }
        }
        console.log();
    }, [navigate, user])
    

    return {
        isAdmin,
        isTeacher,
        isStudent
    }
}
