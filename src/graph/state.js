"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticationToken = exports.setAuthenticationToken = void 0;
var authenticationToken = null;
var setAuthenticationToken = function (token) {
    authenticationToken = token;
    console.log('setAuthenticationToken: token', token);
};
exports.setAuthenticationToken = setAuthenticationToken;
var getAuthenticationToken = function () {
    return authenticationToken;
};
exports.getAuthenticationToken = getAuthenticationToken;
