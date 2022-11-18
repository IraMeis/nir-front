import axios from "axios";
import back from "../util/back.json";

const API_SERVER = back.serverChmmf + "/api/chmmf";

const evalT = (fdata) => {
    return axios.post(API_SERVER + '/t', fdata, {
        responseType: 'blob',
        headers: {
            'Pragma': 'no-store',
            'Expires': 0,
            'Cache-control': 'no-store'
        }
    });
};

const evalR = (fdata) => {
    return axios.post(API_SERVER + '/r', fdata, {
        responseType: 'blob',
        headers: {
            'Pragma': 'no-store',
            'Expires': 0,
            'Cache-control': 'no-store'
        }
    });
};

const ChmmfService = {
    evalR,
    evalT
};

export default ChmmfService;