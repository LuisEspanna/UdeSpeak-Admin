import DashboardIcon from "../components/icons/DashboardIcon";
import UsersIcon from "../components/icons/UsersIcon";
import BugIcon from "../components/icons/BugIcon";
import LanguageIcon from "../components/icons/LanguageIcon";
import { PERMISSIONS } from "../constants";

const menu = () => {
    return [
        {
            "title": "Dashboard",
            "children": [
                {
                    "title": "Dashboard",
                    "icon": <DashboardIcon />,
                    "permission": "all",
                    "url": "/dashboard"
                }
            ]
        },
        {
            "title": "Funciones",
            "permission": "all",
            "children": [
                {
                    "title": "Idiomas",
                    "permission": PERMISSIONS.ALL,
                    "url": "/dashboard/languages",
                    "icon": <LanguageIcon />,
                },
                {
                    "title": "Usuarios",
                    "icon": <UsersIcon />,
                    "permission": PERMISSIONS.ALL,
                    "url": "/dashboard/users"
                }
            ]
        },
        {
            "title": "Reportes",
            "children": [
                {
                    "title": "Bugs",
                    "icon": <BugIcon />,
                    "permission": "all",
                    "url": "/dashboard/bugs"
                }
            ]
        }
    ]
}

export default menu;