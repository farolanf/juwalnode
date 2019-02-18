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
import compose from 'recompose/compose';
import MuiButton from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { translate } from 'ra-core';
import Responsive from '../layout/Responsive';
var styles = {
    button: {
        display: 'inline-flex',
        alignItems: 'center',
    },
    label: {
        paddingLeft: '0.5em',
    },
    labelRightIcon: {
        paddingRight: '0.5em',
    },
    smallIcon: {
        fontSize: 20,
    },
    mediumIcon: {
        fontSize: 22,
    },
    largeIcon: {
        fontSize: 24,
    },
};
var Button = function (_a) {
    var _b = _a.alignIcon, alignIcon = _b === void 0 ? 'left' : _b, children = _a.children, _c = _a.classes, classes = _c === void 0 ? {} : _c, className = _a.className, _d = _a.color, color = _d === void 0 ? 'primary' : _d, disabled = _a.disabled, label = _a.label, _e = _a.size, size = _e === void 0 ? 'small' : _e, translate = _a.translate, rest = __rest(_a, ["alignIcon", "children", "classes", "className", "color", "disabled", "label", "size", "translate"]);
    var _f;
    return (React.createElement(Responsive, { small: label && !disabled ? (React.createElement(Tooltip, { title: translate(label, { _: label }) },
            React.createElement(IconButton, __assign({ "aria-label": translate(label, { _: label }), className: className, color: color }, rest), children))) : (React.createElement(IconButton, __assign({ className: className, color: color, disabled: disabled }, rest), children)), medium: React.createElement(MuiButton, __assign({ className: classnames(classes.button, className), color: color, size: size, "aria-label": label ? translate(label, { _: label }) : undefined, disabled: disabled }, rest),
            alignIcon === 'left' &&
                children &&
                React.cloneElement(children, {
                    className: classes[size + "Icon"],
                }),
            label && (React.createElement("span", { className: classnames((_f = {},
                    _f[classes.label] = alignIcon === 'left',
                    _f[classes.labelRightIcon] = alignIcon !== 'left',
                    _f)) }, translate(label, { _: label }))),
            alignIcon === 'right' &&
                children &&
                React.cloneElement(children, {
                    className: classes[size + "Icon"],
                })) }));
};
Button.propTypes = {
    alignIcon: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    size: PropTypes.string,
    translate: PropTypes.func.isRequired,
};
var enhance = compose(withStyles(styles), translate);
export default enhance(Button);
