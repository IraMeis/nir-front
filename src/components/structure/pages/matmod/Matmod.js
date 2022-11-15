import React, {useContext, useState} from 'react'
import { useInterval } from 'usehooks-ts'
import ModalContext from "../../../context/ModalContext";
import ModalInfo from "../../modal/ModalInfo";
import axios from "axios";
import MatmodService from "../../../../service/matmod.service";
import MatmodContext from "../../../context/MatmodContext";
import NNParam from "./NNParam";
import MainConfig from "./MainConfig";

const Matmod = () => {
    const modalContext = useContext(ModalContext)

    // requests amount
    const [totalAmount, setTotalAmount] = useState(0)
    // dynamic delay
    const [delay, setDelay] = useState(1000)
    // ON/OFF
    const [isRunning, setIsRunning] = useState(false)
    // ability to continuation of getting evals
    const [isEnabled, setIsEnabled] = useState(false)

    // function as one of [r, g, b] on rgb image
    const [images, setImages] = useState([])

    // init files t=0
    const [imagesInitFiles, setImagesInitFiles] = useState([])

    // init files borders
    const [textInitFilesBord, setTextInitFilesBord] = useState([])
    const [isBord, setIsBord] = useState(false)

    // config
    const [NN, setNN] = useState(2)
    const [isNNSet, setIsNNSet] = useState(true)

    // const [As, setAs] = useState('')
    // const [Ds, setDs] = useState('')
    // const [matrix, setMatrix] = useState('')
    // const [It, setIt] = useState(0.055)
    // const [Ix, setIx] = useState(1)
    // const [Iy, setIy] = useState(1)

    function getFuncNumber (){
      return Math.floor((NN - 1) / 3 + 1)
    }

    useInterval(
        () => {
            let req = []
            for (let i = 0; i < getFuncNumber(); ++i){
                req.push(MatmodService.getImages(i))
            }
            axios.all(req).then(axios.spread((...responses) => {
                let resp = []
                for (let i = 0; i < getFuncNumber(); ++i){
                    resp.push(URL.createObjectURL(responses[i].data))
                }
                setImages(resp)
            })).catch(err => {
                console.log(err);
                modalContext.setInfoMess(['Something went wrong', err.message]);
                modalContext.handleShowModalInfo();
            })
            // for one pic
            // MatmodService.getImages(0)
            //     .then((response) => {
            //         const url = URL.createObjectURL(response.data)
            //         setImage(url)
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //         modalContext.setInfoMess(['Something went wrong', err.message]);
            //         modalContext.handleShowModalInfo();
            // });
            setTotalAmount(totalAmount + 1)
        },
        // Delay in milliseconds or null to stop it
        isRunning ? delay : null,
    )

    const handleChangeIsBord = () => {
        setIsBord(!isBord)
    }

    const handleChangeIsNNSet = () => {
        if(!isEnabled) {
            setIsNNSet(!isNNSet)
            setImages([])
            setImagesInitFiles([])
        }
    }

    const handleChangeNN = (event) => {
        const n = Number(event.target.value)
        if(n < 2)
            setNN(2)
        else
            setNN(Math.floor(n))
    }

    const handleChangeDelay = (event) => {
        const dl = Number(event.target.value)
        if(dl < 500)
            setDelay(500)
        else
            setDelay(dl)
    }

    const handleChangeIsRunning = () => {
        if(isEnabled){
            MatmodService.playPause()
                .catch((err) => {
                    console.log(err);
                    modalContext.setInfoMess(['Something went wrong', err.message]);
                    modalContext.handleShowModalInfo();
                });
            setIsRunning(!isRunning)
        }
    }

    const handleChangeIsEnabled = () => {
        if(isEnabled){
            setIsEnabled(false)
            setIsRunning(false)
            setImages([])
            setImagesInitFiles([])
            setTotalAmount(0)
            MatmodService.stop()
                .catch((err) => {
                    console.log(err);
                    modalContext.setInfoMess(['Something went wrong', err.message]);
                    modalContext.handleShowModalInfo();
                });
        }
        else {
            let formData = new FormData();
            formData.append("N", 2)
            formData.append("As",[0.4, -0.3])
            formData.append("Ds", [2, 1])
            formData.append("matrix", [[0, -0.02], [0.01, 0]])
            formData.append("It",0.055)
            formData.append("Ix", 1)
            formData.append("Iy", 1)
            imagesInitFiles.map((file, index) => {
                formData.append(`${index}`, file)
            })
            MatmodService.newSystem( formData)
                .then(() => {
                    setIsEnabled(true)
                    setIsRunning(true)
                })
                .catch((err) => {
                    console.log(err);
                    modalContext.setInfoMess(['Something went wrong', err.message]);
                    modalContext.handleShowModalInfo();
                });
        }
    }

    const selectInitFiles = (event) => {
        const files = event.target.files;
        setImagesInitFiles(Array.from(files))
    }

    const selectInitFilesBord = (event) => {
        const files = event.target.files;
        setTextInitFilesBord(Array.from(files))
    }

    return (
        <MatmodContext.Provider value={{
            selectInitFiles: selectInitFiles,
            imagesInitFiles: imagesInitFiles,
            selectInitFilesBord: selectInitFilesBord,
            textInitFilesBord: textInitFilesBord,
            handleChangeIsEnabled: handleChangeIsEnabled,
            handleChangeIsRunning: handleChangeIsRunning,
            handleChangeDelay: handleChangeDelay,
            isEnabled: isEnabled,
            isRunning: isRunning,
            totalAmount: totalAmount,
            delay: delay,
            isBord: isBord,
            handleChangeIsBord: handleChangeIsBord,
            NN: NN,
            handleChangeNN: handleChangeNN,
            isNNSet: isNNSet,
            handleChangeIsNNSet: handleChangeIsNNSet,
            images: images
        }}>
            <ModalInfo/>
            <NNParam/>
            {isNNSet && <MainConfig/>}
        </MatmodContext.Provider>
    )
}

export default Matmod;