import React, { useState, useMemo } from "react";


const DashboardContext = React.createContext();

export function DashboardProvider(props){
    const [searchAction, setSearchAction] = useState({
        function: null
    });

    const value = useMemo(()=>{
        return ({
            searchAction,
            setSearchAction
        })
    }, [searchAction, setSearchAction]);

    return <DashboardContext.Provider value={value} {...props}/>
}

export function useDashboard(){
    const context = React.useContext(DashboardContext);

    if(!context){
        throw new Error('Error dashboard context')
    }

    return context;
}