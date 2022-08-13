import { useEffect, useState } from 'react';
import useLanguages from '../../../hooks/useLanguages';

export default function useLanguageView() {
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(undefined);

    const { getAll } = useLanguages();

    useEffect(() => {        
        async function fetchLanguages() {
            setIsLoading(true);
            const localLanguages = await getAll();
            setLanguages(localLanguages);
            setIsLoading(false);
        }
        fetchLanguages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleEdit = (index) => {
        setCurrentLanguage(languages[index]);
    }

    const handleCreate = (index) => {
        setIsCreating(true);
    }

    return {
        languages,
        isLoading,
        currentLanguage,
        isCreating,
        handleEdit,
        handleCreate
    }
}
