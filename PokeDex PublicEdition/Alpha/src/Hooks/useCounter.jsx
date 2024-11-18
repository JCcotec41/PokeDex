import { useState } from "react"

export   const  useCounter = (ValorIni = 20) => {
const [counter,setCounter] = useState(ValorIni)

const Aument1 = (val=4) =>{
setCounter (counter + val);
}

const Desau1 = (val=4) =>{
    setCounter (counter - val);
}
const RestNum = () =>{
    setCounter (ValorIni);
}


    return{
        counter,
        Aument1,
        Desau1,
        RestNum,
    }
}



