import { useState, useEffect } from 'react';

export default function useSpeakingView(question) {
    const [state, setState] = useState(question);
    const [image, setImage] = useState(undefined);

    useEffect(() => {
      setState(question);
    }, [question])
    
    
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: (e.target.value) });
    }

    const handleAddPossibleAnswer = () => {
        let possible_answers = state?.possible_answers || [];
        possible_answers.push('');
        setState({...state, possible_answers});
    }

    const onChangePossibleAnswer = (text, index) => {
        let possible_answers = state?.possible_answers;
        possible_answers = [...possible_answers.slice(0, index), text, ...possible_answers.slice(index+1)];
        setState({...state, possible_answers});
    }

    const onDeletePossibleAnswer = (index) => {
        let possible_answers = state?.possible_answers;
        possible_answers = possible_answers.filter((p, i) => i !== index);
        setState({...state, possible_answers});
    }

    const onSave = () => {
        if(state.possible_answers.length > 0 ){
            const possible_answers = state.possible_answers.filter((p) => p.length> 0);
            setState({...state, possible_answers});

            if(state.description === 0){
                //Error
                console.log('Error');
            }
        }            
        else{

        }
    }

    const handleImage = (e) => {
        if(e.target?.files) {
            setImage(e.target?.files[0]);
        } else {
            setImage(undefined);
        }
    }

    return {
        state,
        image,
        handleChange,
        onSave,
        handleAddPossibleAnswer,
        onChangePossibleAnswer,
        onDeletePossibleAnswer,
        handleImage
    }
}
