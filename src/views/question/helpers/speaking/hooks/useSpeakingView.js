import { useState, useEffect } from 'react';

export default function useSpeakingView(question) {
    const [state, setState] = useState(question);

    useEffect(() => {
      setState(question);
    }, [question])
    
    
    const handleChange = (e) => {
        setState(e.target.value);
    }

    return {
        state,
        handleChange
    }
}
