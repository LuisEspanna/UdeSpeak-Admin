import DashboardIcon from "../components/icons/DashboardIcon";
import UsersIcon from "../components/icons/UsersIcon";
import BugIcon from "../components/icons/BugIcon";
import LanguageIcon from "../components/icons/LanguageIcon";
import { PERMISSIONS } from "../constants";

const menu = () => {
    return [
        {
            "title": "Inicio",
            "permissions": [PERMISSIONS.ADMIN, PERMISSIONS.TEACHER],
            "children": [
                {
                    "title": "Dashboard",
                    "icon": <DashboardIcon />,
                    "permissions": [PERMISSIONS.ADMIN, PERMISSIONS.TEACHER],
                    "url": "/dashboard"
                }
            ]
        },
        {
            "title": "Funciones",
            "permissions": PERMISSIONS.ALL,
            "children": [
                {
                    "title": "Idiomas",
                    "permissions": PERMISSIONS.ALL,
                    "url": "/dashboard/languages",
                    "icon": <LanguageIcon />,
                },
                {
                    "title": "Usuarios",
                    "icon": <UsersIcon />,
                    "permissions": [PERMISSIONS.ADMIN, PERMISSIONS.TEACHER],
                    "url": "/dashboard/users"
                }
            ]
        },
        {
            "title": "Reportes",
            "permissions": PERMISSIONS.ALL,
            "children": [
                {
                    "title": "Bugs",
                    "icon": <BugIcon />,
                    "permissions": PERMISSIONS.ALL,
                    "url": "/dashboard/bugs"
                }
            ]
        }
    ]
}

export default menu;