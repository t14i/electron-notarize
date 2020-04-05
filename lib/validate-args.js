"use strict";
exports.__esModule = true;
function isPasswordCredentials(opts) {
    var creds = opts;
    return creds.appleId !== undefined || creds.appleIdPassword !== undefined;
}
exports.isPasswordCredentials = isPasswordCredentials;
function isApiKeyCredentials(opts) {
    var creds = opts;
    return creds.appleApiKey !== undefined || creds.appleApiIssuer !== undefined;
}
exports.isApiKeyCredentials = isApiKeyCredentials;
function validateAuthorizationArgs(opts) {
    var isPassword = isPasswordCredentials(opts);
    var isApiKey = isApiKeyCredentials(opts);
    if (isPassword && isApiKey) {
        throw new Error('Cannot use both password credentials and API key credentials at once');
    }
    if (isPassword) {
        var passwordCreds = opts;
        if (!passwordCreds.appleId) {
            throw new Error('The appleId property is required when using notarization with appleIdPassword');
        }
        else if (!passwordCreds.appleIdPassword) {
            throw new Error('The appleIdPassword property is required when using notarization with appleId');
        }
        return passwordCreds;
    }
    if (isApiKey) {
        var apiKeyCreds = opts;
        if (!apiKeyCreds.appleApiKey) {
            throw new Error('The appleApiKey property is required when using notarization with appleApiIssuer');
        }
        else if (!apiKeyCreds.appleApiIssuer) {
            throw new Error('The appleApiIssuer property is required when using notarization with appleApiKey');
        }
        return apiKeyCreds;
    }
    throw new Error('No authentication properties provided (e.g. appleId, appleApiKey)');
}
exports.validateAuthorizationArgs = validateAuthorizationArgs;
