

import { useState } from 'react';

export default function useDialog() {
    const [showCancelBtn, setShowCancelBtn] = useState(true);
    const [showAcceptBtn, setShowAcceptBtn] = useState(true);
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

    const setVisibleDialog = (visible) => {
        setIsVisibleDialog(visible);
    }

    return {
        showCancelBtn,
        showAcceptBtn,
        isVisibleDialog,
        contentDialog,
        setVisibleDialog,
        setContentDialog,
        setOnAcceptDialog,
        setOnCancelDialog,
        handleAcceptDialog,
        handleCancelDialog,
        setChanges,
        setShowCancelBtn,
        setShowAcceptBtn
    }
}
