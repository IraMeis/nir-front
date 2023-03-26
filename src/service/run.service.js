import axios from "axios";
import bask from "../util/back.json";
import api from "../util/apiList.json";

const API_URL_IMG = bask.serverIMG + api.runIMG;
const API_URL_VI = bask.serverVI + api.runVI;
const API_URL_VI_EVAL = bask.serverVI + api.evalVI;
const API_URL_IMG_EVAL = bask.serverIMG + api.evalIMG;

const API_URL_SAVE = bask.serverIMG + api.save;
const API_URL_GET_EVALS = bask.serverIMG + api.getEvals;

const uploadImage = (file, netName) => {
    let formData = new FormData();
    formData.append("image", file);
    return axios.post(API_URL_IMG + '/' + netName, formData, {
        responseType: 'blob',
        headers: {
            'Content-Type': 'image/jpeg'
        }
    })
};

const uploadVideo = (file, netName) => {
    let formData = new FormData();
    formData.append("video", file);
    return axios.post(API_URL_VI + '/' + netName, formData, {
        responseType: 'blob',
        headers: {
                'Content-Type': 'video/mp4'
        }
    });
};

const getAdditionalDataVideo = (uuid) => {
    return axios.get(API_URL_VI_EVAL + '/' + uuid);
};

const getAdditionalDataImage = (uuid) => {
    return axios.get(API_URL_IMG_EVAL + '/' + uuid);
};

const saveEval = (data) => {
    return axios.post(API_URL_SAVE, data);
};

const getEvals = (search) => {
    return axios.put(API_URL_GET_EVALS + search);
};

const UploadService = {
    uploadVideo,
    uploadImage,
    getAdditionalDataVideo,
    getAdditionalDataImage,
    saveEval,
    getEvals
};

export default UploadService;