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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var get_1 = __importDefault(require("lodash/get"));
var pure_1 = __importDefault(require("recompose/pure"));
var Chip_1 = __importDefault(require("@material-ui/core/Chip"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var styles = {
    chip: { margin: 4 },
};
exports.ChipField = function (_a) {
    var className = _a.className, _b = _a.classes, classes = _b === void 0 ? {} : _b, source = _a.source, _c = _a.record, record = _c === void 0 ? {} : _c, rest = __rest(_a, ["className", "classes", "source", "record"]);
    return (react_1.default.createElement(Chip_1.default, __assign({ className: classnames_1.default(classes.chip, className), label: get_1.default(record, source) }, sanitizeRestProps_1.default(rest))));
};
exports.ChipField.propTypes = {
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    elStyle: prop_types_1.default.object,
    sortBy: prop_types_1.default.string,
    source: prop_types_1.default.string.isRequired,
    record: prop_types_1.default.object,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
exports.ChipField.displayName = 'ChipField';
var PureChipField = styles_1.withStyles(styles)(pure_1.default(exports.ChipField));
exports.default = PureChipField;
