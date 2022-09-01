import React, { useState, useEffect } from 'react';
import ListeningTab from '../helpers/listening/ListeningView';
import ReadingTab from '../helpers/reading/ReadingView';
import SpeakingTab from '../helpers/speaking/SpeakingView';
import WritingTab from '../helpers/writing/WritingView';
import { useParams } from 'react-router-dom';
import useQuestions from '../../../hooks/useQuestions';

const views =  {
    listening : <ListeningTab/>,
    speaking : <SpeakingTab/>,
    reading : <ReadingTab/>,
    writing : <WritingTab/>
}

export default function useQuestionView() {
    const [currentView, setCurrentView] = useState(views.listening);
    const { getQuestion } = useQuestions();
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        async function fetchQuestion() {
            setIsLoading(true);
            const localQuestion = await getQuestion(id);
            setIsLoading(false);
            console.log(localQuestion);
            
            if(localQuestion !== null && localQuestion !== undefined){
                setCurrentView(views[localQuestion.type]);
            }
        }
        fetchQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    
    

    return {
        currentView,
        isLoading
    }
}
