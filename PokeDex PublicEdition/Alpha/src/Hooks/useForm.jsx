
import { useState,useEffect } from "react";


//Manera Implicita Para concatenar Datos
/* export const DatForm = () => {
    const [formState, setFormState] = useState({
        Username: '',
        correo: '',
        pw: '',
    }); */

//Declarando un valor Inicial como un objeto y Almacenandolo en el useState
export const DatForm = (ValIni = {}) => {

const [formState,setFormState] = useState(ValIni);
    

    const OnInputChange = ({target}) => {
        const {name , value} = target;
        setFormState({
            ...formState,
            [name]: value,
        }); 
    };
/*Toma el valor Inicial que es ValIni y recoge los valore de la pestaña
del Form, Toma los campos predeterminados que se declararon y los pone 
en las celdas*/ 
    const BorrarCel = () => {
        setFormState(ValIni);
    }
    
    


    return{
        ...formState,
         formState,
         OnInputChange,
         BorrarCel,
    }
}