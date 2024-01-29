import { useEffect, useState } from 'react'
import useQuestions from '../../../hooks/useQuestions';
import useQuestionnaires from '../../../hooks/useQuestionnaires';
import useGenericSearch from '../../../hooks/useGenericSearch';
import { useDashboard } from '../../../context/dashboard-context';
import useUsers from '../../../hooks/useUsers';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { TYPES } from '../../../constants';

export default function useTeachersView(ref, user) {
    const [questionnaries, setQuestionnaries] = useState([])
    const [students, setStudents] = useState([])
    const [questions, setQuestions] = useState([])
    const questionsProps = useQuestions();
    const questionnariesProps = useQuestionnaires();
    const { results, search, setItems } = useGenericSearch();
    const [filterApplied, setFilterApplied] = useState('Todos');
    const { setSearchAction } = useDashboard();
    const usersProps = useUsers();

    useOnClickOutside(ref, (event) => {
        if (event.target.placeholder === 'Search') {
            setSearchAction({
                function: (e) => {
                    search(e);
                    setFilterApplied(e);
                }
            });
        }
    });


    useEffect(() => {
        async function fetchStudents() {
            const localQuestions = await questionsProps.getQuestionsByUId(user.uid);
            setQuestions(localQuestions);

            const localQuestionaries = await questionnariesProps.getAllbyUid(user.uid);

            const mapQuestionnaries = {}
            localQuestionaries?.forEach((questionnary => {
                mapQuestionnaries[questionnary.id] = {
                    ...questionnary,
                    questions: localQuestions?.filter((question) => question.questionnary_id === questionnary.id) || []
                }
            }));

            setQuestionnaries(mapQuestionnaries);

            const localUsers = await usersProps.getAll();
            const myStudents = [];
            localUsers.forEach((cUser) => {
                if(cUser?.coursed?.questions){
                    const userQuestions = cUser?.coursed?.questions;
                    var uFound = false;                    
                    localQuestions.forEach(q => {
                        const questionnary = mapQuestionnaries[q.questionnary_id];

                        if(userQuestions[q.id] !== null && !uFound){                            
                            var progressCounter = {}
                            questionnary.questions.forEach(item => {
                                if(userQuestions[item.id])
                                    progressCounter[questionnary.id] = progressCounter[questionnary.id] ? progressCounter[questionnary.id] + 1 : 1
                            })

                            var progress = []

                            for (const key in progressCounter) {
                                if (Object.hasOwnProperty.call(progressCounter, key)) {
                                    progress.push({...mapQuestionnaries[key], counter: progressCounter[key]})                                    
                                }
                            }

                            myStudents.push({...cUser, progress});
                            uFound = true;
                        }
                    })
                }
            });
            
            setStudents(myStudents);
            setItems(myStudents);
        }

        fetchStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
    

    const handleSearch = (text) => {
        search(text);
        setFilterApplied(text);
    }

    const getDonutValues = (data) => {
        let values = [0,0,0,0];
        let valMap = {}
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const question = data[key];
                valMap[question.type] = (valMap[question.type] ? valMap[question.type] + 1 : 1)
            }
        }
        values = [
            valMap[TYPES.LISTENING] || 0,
            valMap[TYPES.SPEAKING] || 0,
            valMap[TYPES.READING] || 0,
            valMap[TYPES.WRITING] || 0
        ];
        return values;
    }

    const questionsMapToArray = (questionsMap) => {
        var res = [];
        questions.forEach((q) => {
            var question = questionsMap[q.id];
            if(question) {
                res.push(q);
            }
        })
        return res;
    }

    return {
        questionnaries,
        students,
        questions,
        handleSearch,
        filterApplied,
        results,
        getDonutValues,
        questionsMapToArray
    }
}
