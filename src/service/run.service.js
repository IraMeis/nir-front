import axios from "axios";
import bask from "../util/back.json";
import api from "../util/apiList.json";

const API_URL = bask.server + api.run;

const UploadImage = (file, net) => {
    let formData = new FormData();
    formData.append("image", file);
    return axios.post(API_URL + '/' + net, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export default UploadImage;