import DashboardIcon from "../components/icons/DashboardIcon";
import KeyIcon from "../components/icons/KeyIcon";

const menu = () => {
    return [
        {
            "title": "Dashboard",
            "children": [
                {
                    "title": "Dashboard",
                    "icon": <DashboardIcon/>,
                    "permission": "all",                
                    "url": "/dashboard"
                }
            ]
        },
        {
            "title": "Páginas",
            "children": [
                {
                    "title": "Autenticación",
                    "icon": <KeyIcon/>,
                    "permission": "all",                
                    "url": "/dashboard/auth"                   
                }
            ]
        },
        {
            "title": "Funciones",
            "permission": "all",
            "children": [
                {
                    "title": "Funciones y grupos",
                    "permission": "all",                
                    "url": "/dashboard/levelsandgroups"
                },
                {
                    "title": "Cuestionarios",
                    "permission": "all",      
                    "url": "/dashboard/questionnaires"
                },
                {
                    "title": "Usuarios",
                    "permission": "admin",                
                    "url": "/dashboard/users"
                }
            ]
        }
    ]
}

export default menu;