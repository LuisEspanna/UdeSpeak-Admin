import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PERMISSIONS } from '../constants'


export default function usePermissions() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            switch (user.permission) {
                case PERMISSIONS.ADMIN:
                    setIsAdmin(true);
                    break;
                case PERMISSIONS.TEACHER:
                    setIsTeacher(true);
                    break;
                case PERMISSIONS.STUDENT:
                    setIsStudent(true);
                    break;
                default:
                    navigate("/first-setup", {replace: true});
                    break;
            }
        }
    }, [navigate, user])
    

    return {
        isAdmin,
        isTeacher,
        isStudent
    }
}
