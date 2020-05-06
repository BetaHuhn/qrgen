let mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = process.env.DB;
const options = {
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
var url = `mongodb://${server}/${database}?authSource=admin`

module.exports.connect = function() {
    mongoose.connect(url, options, )
        .then(() => {
            console.log('Database connection successfull: ' + database)
            return mongoose
        })
        .catch(err => {
            console.error('Fucked up while connecting to the database: ' + err)
            process.exit();
        })

    mongoose.connection.on('error', err => {
        console.error(err);
    });
}