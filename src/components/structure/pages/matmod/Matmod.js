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

    // init file for borders
    const [textInitFileBord, setTextInitFileBord] = useState(null)
    const [isBord, setIsBord] = useState(false)

    // config
    const [NN, setNN] = useState(2)
    const [isNNSet, setIsNNSet] = useState(true)

    const [As, setAs] = useState(getAs())
    const [Ds, setDs] = useState(getDs())
    const [matrix, setMatrix] = useState(getMartix())
    const [It, setIt] = useState(0.055)
    const [Ix, setIx] = useState(1)
    const [Iy, setIy] = useState(1)

    function getFuncNumber (){
      return Math.floor((NN - 1) / 3 + 1)
    }

    function getMartix () {
        let res = []
        for (let i = 0; i < NN; ++i) {
            let masi = []
            for (let j = 0; j < NN; ++j) {
                if(i > j)
                    masi.push(0.01)
                else if(i < j)
                    masi.push(-0.01)
                else
                    masi.push(0)
            }
            res.push(masi)
        }
        return res;
    }

    function getDs () {
        let res = []
        for (let i = 0; i < NN; ++i) {
            res.push(1)
        }
        return res;
    }

    function getAs () {
        let res = []
        res.push(0.1)
        for (let i = 1; i < NN; ++i) {
            res.push(-0.1)
        }
        return res;
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
            if(!isNNSet){
                setDs(getDs)
                setAs(getAs)
                setMatrix(getMartix())
            }
            setIsNNSet(!isNNSet)
            setImages([])
            setImagesInitFiles([])
            setTextInitFileBord(null)
        }
    }

    const handleChangeIt = (event) => {
        const n = Number(event.target.value)
        if(n < 0)
            setIt(0.000001)
        else
            setIt(n)
    }

    const handleChangeIx = (event) => {
        const n = Number(event.target.value)
        if(n < 0)
            setIx(0.000001)
        else
            setIx(n)
    }

    const handleChangeIy = (event) => {
        const n = Number(event.target.value)
        if(n < 0)
            setIy(0.000001)
        else
            setIy(n)
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
            setTextInitFileBord(null)
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
            formData.append("N", NN)
            formData.append("As",As)
            formData.append("Ds", Ds)
            formData.append("matrix", matrix)
            formData.append("It",It)
            formData.append("Ix", Ix)
            formData.append("Iy", Iy)
            formData.append("isBord", isBord ? '1' : '0')
            imagesInitFiles.map((file, index) => {
                formData.append(`${index}`, file)
            })
            if(isBord) {
                formData.append('borders', textInitFileBord)
            }
            MatmodService.newSystem(formData)
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

    const selectInitFileBord = (event) => {
        const file = event.target.files[0];
        setTextInitFileBord(file)
    }

    return (
        <MatmodContext.Provider value={{
            selectInitFiles: selectInitFiles,
            imagesInitFiles: imagesInitFiles,
            selectInitFileBord: selectInitFileBord,
            textInitFileBord: textInitFileBord,
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
            images: images,
            As: As,
            setAs: setAs,
            Ds: Ds,
            setDs: setDs,
            matrix: matrix,
            setMatrix: setMatrix,
            It: It,
            Ix: Ix,
            Iy: Iy,
            handleChangeIt: handleChangeIt,
            handleChangeIx: handleChangeIx,
            handleChangeIy: handleChangeIy
        }}>
            <ModalInfo/>
            <NNParam/>
            {isNNSet && <MainConfig/>}
        </MatmodContext.Provider>
    )
}

export default Matmod;