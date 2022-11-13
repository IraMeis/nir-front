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

const playPause = () => {
    return axios.post(API_SERVER + '/pp');
};

const MatmodService = {
    getImages,
    newSystem,
    playPause
};

export default MatmodService;