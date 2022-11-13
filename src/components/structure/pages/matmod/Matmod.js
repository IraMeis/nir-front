import React, {useContext, useState} from 'react'
import { useInterval } from 'usehooks-ts'
import ModalContext from "../../../context/ModalContext";
import ModalInfo from "../../modal/ModalInfo";
import back from "../../../../util/back.json";
import axios from "axios";
import MatmodService from "../../../../service/matmod.service";
import MatmodContext from "../../../context/MatmodContext";
import MatmodFileInput from "./MatmodFileInput";
import StartPlayDelay from "./StartPlayDelay";

const Matmod = () => {
    const API_SERVER = back.serverMatmod + "/api/matmod";
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
    // init files
    const [imagesInitFiles, setImagesInitFiles] = useState([])

    // config
    const [N, setN] = useState(1)

    useInterval(
        () => {
            let req = []
            for (let i = 0; i < N; ++i){
                req.push(MatmodService.getImages(i))
            }
            axios.all(req).then(axios.spread((...responses) => {
                let resp = []
                for (let i = 0; i < N; ++i){
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

    const handleChangeDelay = (event) => {
        const dl = Number(event.target.value)
        if(dl < 500)
            setDelay(500)
        else
            setDelay(dl)
    }

    const handleChangeIsRunning = () => {
        // todo request pause|play model
        if(isEnabled)
            setIsRunning(!isRunning)
    }

    const handleChangeIsEnabled = () => {
        if(isEnabled){
            // todo request clear model
            setIsEnabled(false)
            setIsRunning(false)
            setTotalAmount(0)
        }
        else {
            let formData = new FormData();
            formData.append("N", 2)
            formData.append("As",[0.2, -0.1])
            formData.append("Ds", [2, 1])
            formData.append("matrix", [[0, -0.001], [0.001, 0]])
            formData.append("It",0.1)
            formData.append("Ix", 1)
            formData.append("Iy", 1)
            imagesInitFiles.map((file, index) => {
                formData.append(`${index}`, file)
            })
            axios.post(API_SERVER + '/new', formData)
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

    return (
        <MatmodContext.Provider value={{
            selectInitFiles: selectInitFiles,
            imagesInitFiles: imagesInitFiles,
            handleChangeIsEnabled: handleChangeIsEnabled,
            handleChangeIsRunning: handleChangeIsRunning,
            handleChangeDelay: handleChangeDelay,
            isEnabled: isEnabled,
            isRunning: isRunning,
            totalAmount: totalAmount,
            delay: delay
        }}>
            <ModalInfo/>
            <MatmodFileInput/>
            <StartPlayDelay/>
            {imagesInitFiles.map((imgSrc, index) => (
                <div className="image-area-mm mt-4">
                    <img id="imageResult"
                         src={URL.createObjectURL(imgSrc)}
                         key={index}
                         alt=""
                         width={800}
                         className="img-fluid rounded shadow-sm mx-auto d-block"/>
                </div>))
            }
            {images.map((imgSrc, index) => (
                <div className="image-area-mm mt-4">
                    <img id="imageResult"
                         src={imgSrc}
                         key={index}
                         alt=""
                        // width={800}
                         className="img-fluid rounded shadow-sm mx-auto d-block"/>
                </div>))
            }
        </MatmodContext.Provider>
    )
}

export default Matmod;