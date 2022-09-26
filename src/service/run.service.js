import axios from "axios";
import bask from "../util/back.json";
import api from "../util/apiList.json";

const API_URL_IMG = bask.serverIMG + api.run;
const API_URL_VI = bask.serverVI + api.run;

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

const UploadService = {
  uploadVideo,
  uploadImage
};

export default UploadService;