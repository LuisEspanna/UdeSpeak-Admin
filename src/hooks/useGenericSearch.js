import { useState } from "react";

export default function useGenericSearch() {
    const [results, setResults] = useState([]);
    const [localItems, setLocalItems] = useState([]);
    
    /**
     * 
     * @param {[]} items 
     */
    const setItems = (items) => {
        items?.sort((a, b) => {
            if(a.created_at > b.created_at) return -1;
            else if(a.created_at < b.created_at) return 1;
            else return 0;
        });
        setLocalItems(items);
        setResults(items);
    }

    const search = (text) => {
        let aux = [];
        // TODO: Eliminar de la busqueda a IDs y URLs 
        if(text.length > 0){
            aux = localItems.map((item)=>{
                let localItem = null;
                for (var clave in item){
                    if (item.hasOwnProperty(clave)) {
                        if(JSON.stringify(item[clave]).toLocaleLowerCase().includes(text.toLocaleLowerCase()) 
                           && !JSON.stringify(item[clave]).toLocaleLowerCase().includes('http')
                           && clave !== 'id'
                           && !clave.includes('_id')
                        ){
                            localItem = item;
                        }
                    }
                }
                return localItem;
            }).filter(item => item !== null && item !== undefined);
            
            setResults(aux);
        } else {
            setResults(localItems);
        }
    }

    const sortByLabelDesc = (label ) => {
        let newResults = [];
        results.forEach((item) => {
            newResults.push(item)
        })
        newResults.sort((a, b) => {
            if(a[label] > b[label]) return -1;
            else if(a[label] < b[label]) return 1;
            else return 0;
        })

        setResults(newResults);
    }

    return {
        results,
        search,
        setItems,
        sortByLabelDesc
    }
}