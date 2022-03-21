"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = exports.sleep = exports.prettyJSON = void 0;
// @ts-ignore
var omit_deep_1 = require("omit-deep");
var prettyJSON = function (message, obj) {
    console.log(message, JSON.stringify(obj, null, 2));
};
exports.prettyJSON = prettyJSON;
var sleep = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
exports.sleep = sleep;
var omit = function (object, name) {
    return (0, omit_deep_1.default)(object, name);
};
exports.omit = omit;
