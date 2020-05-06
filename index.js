const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const compression = require('compression');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
require('./database/database').connect()

const appRouter = require('./router/app.js')
const middleware = require("./middleware/middleware")

app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
app.use(express.static('client/dist'));
app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression());
app.use(helmet());
var corsOptions = {
    origin: ['https://qrgen.cc', "https://dev.qrgen.cc"],
    methods: ['GET', 'OPTIONS', 'POST'],
}
app.use(cors(corsOptions))
app.use(middleware.log())
app.use(appRouter)
app.use(helmet.hidePoweredBy({setTo: 'Nokia 3310'}));
app.use((req, res, next) => {
    res.append('answer', '42');
    next();
});

process.on('unhandledRejection', (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
process.on('uncaughtException', (error) => {
    console.log('Shit hit the fan (uncaughtException): ', error);
    //process.exit(1);
})

