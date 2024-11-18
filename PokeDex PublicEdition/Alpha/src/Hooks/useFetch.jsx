import { useEffect, useState } from "react"


const LocalCache = {};

export const useFetch = (url) => {



    const [State,setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
        MessageError: null,
    })
    
    useEffect(() => {
        getFetch();
    }, [url]);
    
    const setLoadingstate = () => {
        setState({
            data: null,
            isLoading: true,
            hasError:false,
            MessageError:null,
        })
    }



    const getFetch = async() =>{

        if(LocalCache[url]){
            console.log('Usando Caché');
            setState({
                data: LocalCache[url],
                isLoading: false,
                hasError: false,
                MessageError: null,
            })
            return;
        }
        

        setLoadingstate();


        await new Promise(resolver => setTimeout(resolver, 2000))
        const respuesta = await fetch(url)
        if (!respuesta.ok){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                MessageError: {
                    code: respuesta.status,
                    Message: respuesta.statusText,
                }
            });
            return;
        }
        const data = await respuesta.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            MessageError: null,
        })

        //Manejo del caché

        LocalCache[url] = data;
    }


    return {
        data: State.data,
        isLoading: State.isLoading,
        hasError: State.hasError,
    }
}