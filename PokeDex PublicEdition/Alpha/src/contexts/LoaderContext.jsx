import { useState, createContext } from 'react';
import { Loader } from '../Componentes/Loader';

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);

    return (
        <LoaderContext.Provider value={{ setLoading }}>
            { loading && <Loader/> }
            {children}
        </LoaderContext.Provider>
    )
}