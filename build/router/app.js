"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var model_js_1 = __importDefault(require("../models/model.js"));
var mongoose_1 = __importDefault(require("mongoose"));
var fs_1 = __importDefault(require("fs"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var nanoid_1 = __importDefault(require("nanoid"));
var validURL = require("../utils/validUrl");
var currentDate = require("../utils/currentDate");
var router = express_1.default.Router();
var limit = express_rate_limit_1.default({
    windowMs: 15 * 60 * 1000,
    max: 200,
    handler: function (req, res /*next*/) {
        console.log(req.ip + " has exceeded rate limit");
        res.status(429).send({
            status: 429,
            type: "error",
            response: "rate limit exceeded",
            error: {
                text: "rate limit exceeded",
                limit: req.rateLimit.limit,
                current: req.rateLimit.current,
                remaining: req.rateLimit.remaining,
                resetTime: req.rateLimit.resetTime,
            },
        });
    },
    // TODO: seems to not exist?
    // draft_polli_ratelimit_headers: true,
    headers: true,
});
router.get("*", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var url, short, short_1, _id, query, short_2, html, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = req.url.substr(1);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, model_js_1.default.findOne({ code: url })];
            case 2:
                short = _a.sent();
                if (!!short) return [3 /*break*/, 7];
                return [4 /*yield*/, validURL(url)];
            case 3:
                url = _a.sent();
                if (!url) return [3 /*break*/, 5];
                return [4 /*yield*/, model_js_1.default.findOne({ url: url })];
            case 4:
                short_1 = _a.sent();
                if (!short_1) {
                    console.log("adding short to db");
                    _id = new mongoose_1.default.Types.ObjectId();
                    query = {
                        _id: _id,
                        // TODO: enter length of generated code
                        code: nanoid_1.default(5),
                        url: url,
                        addedAt: currentDate(),
                    };
                    try {
                        short_2 = new model_js_1.default(query);
                        // TODO: remove any
                        short_2.save(function (err, doc) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (err) {
                                        console.error(err);
                                        res.json({ status: "400", type: "error" });
                                    }
                                    else {
                                        console.log("Short added as: " + doc._id);
                                        res.redirect("/?code=" + doc.code + "&url=" + doc.url);
                                    }
                                    return [2 /*return*/];
                                });
                            });
                        });
                    }
                    catch (error) {
                        console.error(error);
                        res.json({ status: "400", type: "error" });
                    }
                }
                else {
                    console.log("short: " +
                        short_1.code +
                        " url: " +
                        short_1.url +
                        " already in db -> frontend");
                    res.redirect("/?code=" + short_1.code + "&url=" + short_1.url);
                }
                return [3 /*break*/, 6];
            case 5:
                console.log("not a valid code/url -> frontend");
                html = fs_1.default.readFileSync("./client/dist/index.html", "utf8");
                res.send(html);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                console.log("short: " + short.code + " found -> redirecting to " + short.url);
                short.increase();
                res.redirect(short.url);
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                console.error(error_1);
                res.json({ status: 500, response: "error" });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
router.post("/api/create", limit, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var url, short, _id, query, short_3, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, validURL(req.body.url)];
            case 1:
                url = _a.sent();
                if (!url) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, model_js_1.default.findOne({ url: url })];
            case 3:
                short = _a.sent();
                if (!short) {
                    _id = new mongoose_1.default.Types.ObjectId();
                    query = {
                        _id: _id,
                        // TODO: enter length of generated code
                        code: nanoid_1.default(5),
                        url: url,
                        addedAt: currentDate(),
                    };
                    try {
                        short_3 = new model_js_1.default(query);
                        // TODO: remove any
                        short_3.save(function (err, doc) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (err) {
                                        console.error(err);
                                        res.json({ status: "400", type: "error" });
                                    }
                                    else {
                                        console.log("Short added, code: " + doc.code + " url: " + doc.url);
                                        res.json({
                                            status: "200",
                                            response: "success",
                                            data: {
                                                code: doc.code,
                                                url: doc.url,
                                            },
                                        });
                                    }
                                    return [2 /*return*/];
                                });
                            });
                        });
                    }
                    catch (error) {
                        console.error(error);
                        res.json({ status: "400", type: "error" });
                    }
                }
                else {
                    console.log("Short already in db, code: " + short.code + " url: " + short.url);
                    res.json({
                        status: 200,
                        response: "success",
                        data: {
                            code: short.code,
                            url: short.url,
                        },
                    });
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                res.json({ status: 500, response: "error" });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                console.log(req.body.url + " is not a valid url");
                res.json({
                    status: 405,
                    response: "not a valid url",
                });
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
