import { useState, useEffect } from 'react';
import ListeningTab from '../helpers/listeningV2/ListeningView';
import ReadingTab from '../helpers/reading/ReadingView';
import SpeakingTab from '../helpers/speaking/SpeakingView';
import WritingTab from '../helpers/writing/WritingView';
import { useParams } from 'react-router-dom';
import useQuestions from '../../../hooks/useQuestions';

const views =  {
    listening : (question) => <ListeningTab question={question}/>,
    speaking : (question) => <SpeakingTab question={question}/>,
    reading : (question) => <ReadingTab question={question}/>,
    writing : (question) => <WritingTab question={question}/>
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
            
            if(localQuestion !== null && localQuestion !== undefined){
                setCurrentView(views[localQuestion.type]({...localQuestion, id}));
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
