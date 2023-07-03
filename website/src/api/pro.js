import requests from "./request";
const pro = {
    getAllProInfo() {
        return requests.get('/pro/allproinfo')
    }

}
export default pro;