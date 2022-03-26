"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloClient = void 0;
var core_1 = require("@apollo/client/core");
var cross_fetch_1 = require("cross-fetch");
var config_1 = require("./config");
var state_1 = require("./state");
var httpLink = new core_1.HttpLink({
    uri: config_1.LENS_API,
    fetch: cross_fetch_1.default,
});
// example how you can pass in the x-access-token into requests using `ApolloLink`
var authLink = new core_1.ApolloLink(function (operation, forward) {
    var token = (0, state_1.getAuthenticationToken)();
    // console.log('jwt token:', token);
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            'x-access-token': token ? "Bearer ".concat(token) : '',
        },
    });
    // Call the next link in the middleware chain.
    return forward(operation);
});
exports.apolloClient = new core_1.ApolloClient({
    link: authLink.concat(httpLink),
    cache: new core_1.InMemoryCache(),
});
