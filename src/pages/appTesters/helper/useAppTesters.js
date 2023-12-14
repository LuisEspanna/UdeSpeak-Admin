import { useEffect, useState } from 'react';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import {
    readFromFirestore,
} from '../../../services/firebase';
import { COLLECTIONS } from '../../../constants';

const data = [
    {
        image: img1,
        text: "Udespeak, una aplicación móvil diseñada por estudiantes universitarios apasionados para entusiastas de los idiomas como tú!",
        id: 1
    },
    {
        image: img2,
        text: "¿Te gustaría ser parte de nuestra prueba piloto? Ayúdanos a mejorar ",
        id: 2
    },
    {
        image: img3,
        text: "¡Descarga Udespeak ahora y transforma tu viaje de aprendizaje de idiomas en una aventura inspiradora!",
        id: 3
    },
    {
        image: img4,
        text: "Es un proyecto de grado creado por estudiantes de Ingeniería Electrónica y Sistemas, el contenido fué creado por Docentes capacitados.",
        id: 4
    }
]

export default function useAppTesters() {
    const [currentId, setCurrentId] = useState(0)
    const [item, setItem] = useState(data[0]);
    const [apkLink, setApkLink] = useState('');

    useEffect(() => {
        const fetching = async() => {
            let snapshot = await readFromFirestore(COLLECTIONS.APK, null);
            snapshot?.forEach(doc => {
                const item = { ...doc.data() };
                setApkLink(item.link);
            });
        }

        fetching();
    }, []);
    

    const handlePrev = () => {
        if (currentId > 0) {
            setCurrentId(currentId - 1);
            setItem(data[currentId - 1])
        } else {
            setCurrentId(data.length - 1);
            setItem(data[data.length - 1]);
        }
    }

    const handleNext = () => {
        if (currentId < 3) {
            setCurrentId(currentId + 1);
            setItem(data[currentId + 1])
        } else {
            setCurrentId(0);
            setItem(data[0]);
        }
    }

    return {
        item,
        data,
        apkLink,
        handlePrev,
        handleNext,
    }
}
