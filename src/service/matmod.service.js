import axios from "axios";
import back from "../util/back.json";

const API_SERVER = back.serverMatmod + "/api/matmod";

const getImages = (numb) => {

    return axios.get(API_SERVER + '/update/' + String(numb),
        {
            responseType: 'blob',
            headers: {
                'Pragma': 'no-store',
                'Expires': 0,
                'Cache-control': 'no-store'
            }
        });
};

const newSystem = (fdata) => {
    return axios.post(API_SERVER + '/new', fdata);
};

// const uploadVideo = (file, netName) => {
//     let formData = new FormData();
//     formData.append("video", file);
//     return axios.post(API_URL_VI + '/' + netName, formData, {
//         responseType: 'blob',
//         headers: {
//             'Content-Type': 'video/mp4'
//         }
//     });
// };
//
// const getAdditionalDataVideo = (uuid) => {
//     return axios.get(API_URL_VI_EVAL + '/' + uuid);
// };

const MatmodService = {
    getImages,
    newSystem
};

export default MatmodService;