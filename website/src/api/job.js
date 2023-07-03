import requests from "./request";
const job = {
    getJobList({ jcname, cname }) {
        return requests.get('/job/getjobinfo', {
            params: {
                jcname,
                cname,
            }
        })
    }
}
export default job;