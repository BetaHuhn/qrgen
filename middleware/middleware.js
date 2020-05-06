const { getClientIp } = require('request-ip')

module.exports = {
    log: () => {
        return (req, res, next) => {
            const ip = getClientIp(req)
            const date_ob = new Date();
            const date = ("0" + date_ob.getDate()).slice(-2);
            const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            const year = date_ob.getFullYear();
            const hours = date_ob.getHours();
            const minutes = date_ob.getMinutes();
            const seconds = date_ob.getSeconds();
            const milli = date_ob.getMilliseconds();
            const time = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milli}`;
            console.log(`${time} ${req.method} ${req.originalUrl} request from ${ip}`);
            next()
        }
    }
}