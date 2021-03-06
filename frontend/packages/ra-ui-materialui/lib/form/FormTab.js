"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_router_dom_1 = require("react-router-dom");
var Tab_1 = __importDefault(require("@material-ui/core/Tab"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var FormInput_1 = __importDefault(require("./FormInput"));
var sanitizeRestProps = function (_a) {
    var label = _a.label, icon = _a.icon, value = _a.value, translate = _a.translate, rest = __rest(_a, ["label", "icon", "value", "translate"]);
    return rest;
};
var hiddenStyle = { display: 'none' };
var FormTab = /** @class */ (function (_super) {
    __extends(FormTab, _super);
    function FormTab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderHeader = function (_a) {
            var className = _a.className, label = _a.label, icon = _a.icon, value = _a.value, translate = _a.translate, rest = __rest(_a, ["className", "label", "icon", "value", "translate"]);
            var to = { pathname: value, state: { skipFormReset: true } };
            return (react_1.default.createElement(Tab_1.default, __assign({ key: label, label: translate(label, { _: label }), value: value, icon: icon, className: classnames_1.default('form-tab', className), component: react_router_dom_1.Link, to: to }, sanitizeRestProps(rest))));
        };
        _this.renderContent = function (_a) {
            var children = _a.children, hidden = _a.hidden, basePath = _a.basePath, record = _a.record, resource = _a.resource;
            return (react_1.default.createElement("span", { style: hidden ? hiddenStyle : null }, react_1.default.Children.map(children, function (input) {
                return input && (react_1.default.createElement(FormInput_1.default, { basePath: basePath, input: input, record: record, resource: resource }));
            })));
        };
        return _this;
    }
    FormTab.prototype.render = function () {
        var _a = this.props, children = _a.children, context = _a.context, rest = __rest(_a, ["children", "context"]);
        return context === 'header'
            ? this.renderHeader(rest)
            : this.renderContent(__assign({ children: children }, rest));
    };
    return FormTab;
}(react_1.Component));
FormTab.propTypes = {
    className: prop_types_1.default.string,
    children: prop_types_1.default.node,
    context: prop_types_1.default.oneOf(['header', 'content']),
    hidden: prop_types_1.default.bool,
    icon: prop_types_1.default.element,
    label: prop_types_1.default.string.isRequired,
    path: prop_types_1.default.string,
    translate: prop_types_1.default.func.isRequired,
    value: prop_types_1.default.string,
};
FormTab.displayName = 'FormTab';
exports.default = ra_core_1.translate(FormTab);
