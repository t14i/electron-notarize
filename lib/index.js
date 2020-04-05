"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var debug = require("debug");
var path = require("path");
var spawn_1 = require("./spawn");
var helpers_1 = require("./helpers");
var validate_args_1 = require("./validate-args");
var d = debug('electron-notarize');
var validate_args_2 = require("./validate-args");
exports.validateAuthorizationArgs = validate_args_2.validateAuthorizationArgs;
function authorizationArgs(rawOpts) {
    var opts = validate_args_1.validateAuthorizationArgs(rawOpts);
    if (validate_args_1.isPasswordCredentials(opts)) {
        return ['-u', helpers_1.makeSecret(opts.appleId), '-p', helpers_1.makeSecret(opts.appleIdPassword)];
    }
    else {
        return [
            '--apiKey',
            helpers_1.makeSecret(opts.appleApiKey),
            '--apiIssuer',
            helpers_1.makeSecret(opts.appleApiIssuer),
        ];
    }
}
function startNotarize(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    d('starting notarize process for app:', opts.appPath);
                    return [4 /*yield*/, helpers_1.withTempDir(function (dir) { return __awaiter(_this, void 0, void 0, function () {
                            var filePath, cpResult, zipResult, notarizeArgs, result, uuidMatch;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(path.extname(opts.appPath) == '.dmg')) return [3 /*break*/, 2];
                                        d('copying application to:', filePath);
                                        filePath = path.resolve(dir, path.basename(opts.appPath));
                                        return [4 /*yield*/, spawn_1.spawn('cp', [path.basename(opts.appPath), filePath], {
                                                cwd: path.dirname(opts.appPath)
                                            })];
                                    case 1:
                                        cpResult = _a.sent();
                                        if (cpResult.code !== 0) {
                                            throw new Error("Failed to copy application, exited with code: " + cpResult.code + "\n\n" + cpResult.output);
                                        }
                                        d('copy succeeded, attempting to upload to Apple');
                                        return [3 /*break*/, 5];
                                    case 2:
                                        if (!(path.extname(opts.appPath) == '.app')) return [3 /*break*/, 4];
                                        filePath = path.resolve(dir, path.basename(opts.appPath, '.app') + ".zip");
                                        d('zipping application to:', filePath);
                                        return [4 /*yield*/, spawn_1.spawn('zip', ['-r', '-y', filePath, path.basename(opts.appPath)], {
                                                cwd: path.dirname(opts.appPath)
                                            })];
                                    case 3:
                                        zipResult = _a.sent();
                                        if (zipResult.code !== 0) {
                                            throw new Error("Failed to zip application, exited with code: " + zipResult.code + "\n\n" + zipResult.output);
                                        }
                                        d('zip succeeded, attempting to upload to Apple');
                                        return [3 /*break*/, 5];
                                    case 4: throw new Error("Unexpected application file type.");
                                    case 5:
                                        notarizeArgs = __spreadArrays([
                                            'altool',
                                            '--notarize-app',
                                            '-f',
                                            filePath,
                                            '--primary-bundle-id',
                                            opts.appBundleId
                                        ], authorizationArgs(opts));
                                        if (opts.ascProvider) {
                                            notarizeArgs.push('-itc_provider', opts.ascProvider);
                                        }
                                        return [4 /*yield*/, spawn_1.spawn('xcrun', notarizeArgs)];
                                    case 6:
                                        result = _a.sent();
                                        if (result.code !== 0) {
                                            throw new Error("Failed to upload app to Apple's notarization servers\n\n" + result.output);
                                        }
                                        d('upload success');
                                        uuidMatch = /\nRequestUUID = (.+?)\n/g.exec(result.output);
                                        if (!uuidMatch) {
                                            throw new Error("Failed to find request UUID in output:\n\n" + result.output);
                                        }
                                        d('found UUID:', uuidMatch[1]);
                                        return [2 /*return*/, {
                                                uuid: uuidMatch[1]
                                            }];
                                }
                            });
                        }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.startNotarize = startNotarize;
function waitForNotarize(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var result, notarizationInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    d('checking notarization status:', opts.uuid);
                    return [4 /*yield*/, spawn_1.spawn('xcrun', __spreadArrays([
                            'altool',
                            '--notarization-info',
                            opts.uuid
                        ], authorizationArgs(opts)))];
                case 1:
                    result = _a.sent();
                    if (!(result.code !== 0)) return [3 /*break*/, 3];
                    // These checks could fail for all sorts of reasons, including:
                    //  * The status of a request isn't available as soon as the upload request returns, so
                    //    it may just not be ready yet.
                    //  * If using keychain password, user's mac went to sleep and keychain locked.
                    //  * Regular old connectivity failure.
                    d("Failed to check status of notarization request, retrying in 30 seconds: " + opts.uuid + "\n\n" + result.output);
                    return [4 /*yield*/, delay(30000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, waitForNotarize(opts)];
                case 3:
                    notarizationInfo = helpers_1.parseNotarizationInfo(result.output);
                    if (!(notarizationInfo.status === 'in progress')) return [3 /*break*/, 5];
                    d('still in progress, waiting 30 seconds');
                    return [4 /*yield*/, delay(30000)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, waitForNotarize(opts)];
                case 5:
                    d('notarzation done with info:', notarizationInfo);
                    if (notarizationInfo.status === 'invalid') {
                        d('notarization failed');
                        throw new Error("Apple failed to notarize your application, check the logs for more info\n\nStatus Code: " + (notarizationInfo.statusCode || 'No Code') + "\nMessage: " + (notarizationInfo.statusMessage || 'No Message') + "\nLogs: " + notarizationInfo.logFileUrl);
                    }
                    if (notarizationInfo.status !== 'success') {
                        throw new Error("Unrecognized notarization status: \"" + notarizationInfo.status + "\"");
                    }
                    d('notarization was successful');
                    return [2 /*return*/];
            }
        });
    });
}
exports.waitForNotarize = waitForNotarize;
function stapleApp(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    d('attempting to staple app:', opts.appPath);
                    return [4 /*yield*/, spawn_1.spawn('xcrun', ['stapler', 'staple', '-v', path.basename(opts.appPath)], {
                            cwd: path.dirname(opts.appPath)
                        })];
                case 1:
                    result = _a.sent();
                    if (result.code !== 0) {
                        throw new Error("Failed to staple your application with code: " + result.code + "\n\n" + result.output);
                    }
                    d('staple succeeded');
                    return [2 /*return*/];
            }
        });
    });
}
exports.stapleApp = stapleApp;
function notarize(_a) {
    var appBundleId = _a.appBundleId, appPath = _a.appPath, ascProvider = _a.ascProvider, authOptions = __rest(_a, ["appBundleId", "appPath", "ascProvider"]);
    return __awaiter(this, void 0, void 0, function () {
        var uuid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, startNotarize(__assign({ appBundleId: appBundleId,
                        appPath: appPath,
                        ascProvider: ascProvider }, authOptions))];
                case 1:
                    uuid = (_b.sent()).uuid;
                    /**
                     * Wait for Apples API to initialize the status UUID
                     *
                     * If we start checking too quickly the UUID is not ready yet
                     * and this step will fail.  It takes Apple a number of minutes
                     * to actually complete the job so an extra 10 second delay here
                     * is not a big deal
                     */
                    d('notarization started, waiting for 10 seconds before pinging Apple for status');
                    return [4 /*yield*/, delay(10000)];
                case 2:
                    _b.sent();
                    d('starting to poll for notarization status');
                    return [4 /*yield*/, waitForNotarize(__assign({ uuid: uuid }, authOptions))];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, stapleApp({ appPath: appPath })];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.notarize = notarize;
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
