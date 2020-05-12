"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    code: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
    },
    addedAt: {
        type: Date,
        required: true,
    },
});
schema.methods.increase = function () {
    this.count += 1;
};
exports.default = mongoose.model("Short", schema);
