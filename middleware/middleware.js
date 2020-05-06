const { getClientIp } = require('request-ip')

module.exports = {
    log: () => {
        return (req, res, next) => {
            const ip = getClientIp(req)
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();
            let milli = date_ob.getMilliseconds();
            var time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + "." + milli;
            console.log(time + " " + req.method + " " + req.originalUrl + ' request from: ' + ip);
            next()
        }
    }
}