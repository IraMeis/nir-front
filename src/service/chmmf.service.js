import axios from "axios";
import back from "../util/back.json";

const API_SERVER = back.serverChmmf + "/api/chmmf";

const evalModel = (fdata, coord) => {
    return axios.post(API_SERVER + '/' + coord, fdata, {
        responseType: 'blob',
        headers: {
            'Pragma': 'no-store',
            'Expires': 0,
            'Cache-control': 'no-store'
        }
    });
};

const ChmmfService = {
    evalModel
};

export default ChmmfService;