

import { useState } from 'react';

export default function useDialog() {
    const [isVisibleDialog, setIsVisibleDialog] = useState(false);
    const [contentDialog, setContentDialog] = useState();
    const [onAcceptDialog, setOnAcceptDialog] = useState();
    const [onCancelDialog, setOnCancelDialog] = useState();
    const [changes, setChanges] = useState();

    const handleAcceptDialog = () => {
        if(onAcceptDialog) onAcceptDialog.fn(changes);
        setIsVisibleDialog(false);
        setContentDialog(null);
    }

    const handleCancelDialog = () => {
        if(onCancelDialog) onCancelDialog.fn();
        setIsVisibleDialog(false);
        setContentDialog(null);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /*
    const swap = async() => {
        await sleep(1500).finally(()=>{
            let dashboard = document.getElementById('dashboard');
            let node = document.getElementById('dialog_overlay');
            let parent = node?.parentNode;
            let found = false;

            parent?.childNodes?.forEach(n => {
                if( n === node)
                found = true;
            })
            
            if(found){
                parent.removeChild(node);
                dashboard.appendChild(node);
            }
            console.log('swap', found)
        });
    }


    const forceClose = () => {
        let dashboard = document.getElementById('dashboard');
        let node = document.getElementById('dialog_overlay');
        let found = false;
        
        dashboard?.childNodes?.forEach(n => {
            if( n === node)
            found = true;
        })
        
        if(found){
            dashboard.removeChild(node);
        }
    }
    */

    const setVisibleDialog = (visible) => {
        //if(visible) swap();
        setIsVisibleDialog(visible);
    }

    return {
        setVisibleDialog,
        setContentDialog,
        setOnAcceptDialog,
        setOnCancelDialog,
        handleAcceptDialog,
        handleCancelDialog,
        isVisibleDialog,
        contentDialog,
        //forceClose,
        setChanges
    }
}
