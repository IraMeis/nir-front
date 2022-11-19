import React, {useState} from 'react'
import ModalInfo from "../../modal/ModalInfo";
import ChmmfContext from "../../../context/ChmmfContext";
import MainConfig from "./MainConfig";

const Chmmf = () => {

    const [image, setImage] = useState(undefined)

    const [RFiz, setRFiz] = useState(5)
    const [TFiz, setTFiz] = useState(200)
    const [kFiz, setKFiz] = useState(0.065)
    const [cFiz, setCFiz] = useState(1.84)

    const [I, setI] = useState(200)
    const [K, setK] = useState(200)

    const [isxlim, setIsXlim] = useState(false)
    const [isylim, setIsYlim] = useState(false)
    const [xlim, setXlim] = useState([0, 0])
    const [ylim, setYlim] = useState([0, 0])

    const [ind, setInd] = useState('')

    return (
        <ChmmfContext.Provider value={{
            image, setImage,
            RFiz, setRFiz,
            TFiz, setTFiz,
            kFiz, setKFiz,
            cFiz, setCFiz,
            I, setI,
            K, setK,
            xlim, setXlim,
            ylim, setYlim,
            isxlim, setIsXlim,
            isylim, setIsYlim,
            ind, setInd
        }}>
            <ModalInfo/>
            <MainConfig/>
        </ChmmfContext.Provider>
    )
}

export default Chmmf;