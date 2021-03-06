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
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Labeled from '../input/Labeled';
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, record = _a.record, rest = __rest(_a, ["basePath", "record"]);
    return rest;
};
var styles = function (theme) { return ({
    input: { width: theme.spacing.unit * 32 },
}); };
export var FormInput = function (_a) {
    var classes = _a.classes, input = _a.input, rest = __rest(_a, ["classes", "input"]);
    var _b, _c;
    return input ? (React.createElement("div", { className: classnames('ra-input', "ra-input-" + input.props.source, input.props.formClassName) }, input.props.addLabel ? (React.createElement(Labeled, __assign({ id: input.props.id || input.props.source }, input.props, sanitizeRestProps(rest)), React.cloneElement(input, __assign({ className: classnames((_b = {},
            _b[classes.input] = !input.props.fullWidth,
            _b), input.props.className), id: input.props.id || input.props.source }, rest)))) : (React.cloneElement(input, __assign({ className: classnames((_c = {},
            _c[classes.input] = !input.props.fullWidth,
            _c), input.props.className), id: input.props.id || input.props.source }, rest))))) : null;
};
FormInput.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    input: PropTypes.object,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
FormInput.displayName = 'FormInput';
export default withStyles(styles)(FormInput);
