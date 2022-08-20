import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PERMISSIONS } from '../constants';

export default function usePermissions() {
    const user = useSelector((state) => state.user);
    const [isAdmin, setIsAdmin] = useState(user?.permission === PERMISSIONS.ADMIN);
    const [isTeacher, setIsTeacher] = useState(user?.permission === PERMISSIONS.TEACHER);
    const [isStudent, setIsStudent] = useState(user?.permission === PERMISSIONS.STUDENT);
    
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
    }, [navigate, user]);
    

    return {
        user,
        isAdmin,
        isTeacher,
        isStudent
    }
}
