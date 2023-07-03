import requests from "./request";
const news = {
    //获取推荐新闻列表
    getRcommendNews() {
        return requests.get("/news/recomnews")
    },
    //根据新闻类型查询
    getNewsByType(type) {
        return requests.get("/news/newsbytype/" + type)
    }

}
export default news;