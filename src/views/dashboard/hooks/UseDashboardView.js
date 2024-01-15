import { useEffect, useState } from "react";
import useGroups from '../../../hooks/useGroups';
import useQuestionnaires from '../../../hooks/useQuestionnaires';
import useQuestions from '../../../hooks/useQuestions';
import { TYPES } from '../../../constants';

export default function UseDashboardView() {
    const [groups, setGroups] = useState([]);
    const [questionnaries, setQuestionnaries] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lineChartValues, setLineChartValues] = useState([]);
    const [doughnutChartValues, setDoughnutChartValues] = useState([]);

    const {getMyGroups} = useGroups();
    const {getAll} = useQuestionnaires();
    const {getQuestionsById} = useQuestions();

    useEffect(() => {
        async function fetchGroups() {
            setIsLoading(true);
            const localGroups = await getMyGroups();
            setGroups(localGroups.map(g => {return {...g, counter: 54}}));
            lineData(localGroups);
            fetchQuestionnaires(localGroups);
            setIsLoading(false);
        }

        async function fetchQuestionnaires(localGroups) {         
            let localQuestionnaries = [];
            for (let i = 0; i < localGroups.length; i++) {
                const g = localGroups[i];                
                let res = await getAll(g.id);
                res.forEach(r => {
                    localQuestionnaries.push(r);
                });                
            }
            setQuestionnaries(localQuestionnaries);
            fetchQuestions(localQuestionnaries);
        }

        async function fetchQuestions(localQuestionnaries) {         
            let localQuestions = [];
            for (let i = 0; i < localQuestionnaries.length; i++) {
                const item = localQuestionnaries[i];                
                let res = await getQuestionsById(item.id);
                res.forEach(r => {
                    localQuestions.push(r);
                }); 
            }
            setQuestions(localQuestions);
            doughnutData(localQuestions);
        }

        function lineData(data){
            let values = [0,0,0,0,0,0,0,0,0,0,0,0];
            data.forEach(g => {
                let date = new Date(g.created_at);
                if(date.getFullYear() === new Date().getFullYear()){
                    values[date.getMonth()] = values[date.getMonth()] + 1;
                }
            });
            setLineChartValues(values);
        }

        function doughnutData(data){
            let values = [0,0,0,0];
            data.forEach(d => {
                switch (d.type) {
                    case TYPES.LISTENING:
                        values[0] = values[0] + 1;
                    break;

                    case TYPES.SPEAKING:
                        values[1] = values[1] + 1;
                    break;

                    case TYPES.READING:
                        values[2] = values[2] + 1;
                    break;

                    case TYPES.WRITING:
                        values[3] = values[3] + 1;
                    break;
                
                    default:
                        break;
                }
            });
            setDoughnutChartValues(values);
        }

        fetchGroups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    


  return {
    groups,
    questionnaries,
    questions,
    isLoading,
    lineChartValues,
    doughnutChartValues
  }
}
