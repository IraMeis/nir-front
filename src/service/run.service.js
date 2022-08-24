import axios from "axios";
import bask from "../util/back.json";
import api from "../util/apiList.json";

const API_URL = bask.server + api.run;

const UploadImage = (file, netName) => {
    let formData = new FormData();
    formData.append("image", file);
    return axios.post(API_URL + '/' + netName, formData, {
        responseType: 'blob',
        headers: {
            'Content-Type': 'image/jpeg'
        }
    });
};

export default UploadImage;