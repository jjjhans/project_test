const db = require('../db/index')
exports.getJobInfoList = (req, res) => {
    const sqlone = 'SELECT j.id,title,description,c.name AS c_name,jc.name AS jc_name from bs_jobs j,bs_city_infos c,bs_job_categories jc WHERE j.job_category=jc.id AND j.city=c.code'
    // const sqljcname = 'SELECT j.id,title,description,c.name AS c_name,jc.name AS jc_name from bs_jobs j,bs_city_infos c,bs_job_categories jc WHERE j.job_category=jc.id AND j.city=c.code AND jc.name=?'
    const sqlcanme = 'SELECT j.id,title,description,c.name AS c_name,jc.name AS jc_name from bs_jobs j,bs_city_infos c,bs_job_categories jc WHERE j.job_category=jc.id AND j.city=c.code AND c.name IN (?)'
    // const sqltwo = 'SELECT j.id,title,description,c.name AS c_name,jc.name AS jc_name from bs_jobs j,bs_city_infos c,bs_job_categories jc WHERE j.job_category=jc.id AND j.city=c.code AND jc.name=? AND c.name=?'
    var test = ''
    var sql = sqlone
    // console.log(req.query, req.query.cname)
    if (req.query.cname) {
        test = req.query.cname
        sql = sqlcanme
        db.query(sql, test, (err, results) => {
            if (err) return res.cc(err, 1)
            if (results.length == 0) return res.cc('no data', 1)
            res.send({
                status: 0,
                message: '获取数据成功！',
                data: results
            })
        })
    } else {
        db.query(sql, test, (err, results) => {
            if (err) return res.cc(err, 1)
            if (results.length == 0) return res.cc('no data', 1)
            res.send({
                status: 0,
                message: '获取数据成功！',
                data: results
            })
        })
    }

}