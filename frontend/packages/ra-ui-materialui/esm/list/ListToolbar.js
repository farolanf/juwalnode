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
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
var styles = {
    toolbar: {
        justifyContent: 'space-between',
    },
};
var ListToolbar = function (_a) {
    var _b = _a.classes, classes = _b === void 0 ? {} : _b, filters = _a.filters, actions = _a.actions, bulkActions = _a.bulkActions, exporter = _a.exporter, rest = __rest(_a, ["classes", "filters", "actions", "bulkActions", "exporter"]);
    return (React.createElement(Toolbar, { className: classes.toolbar },
        filters &&
            React.cloneElement(filters, __assign({}, rest, { context: 'form' })),
        React.createElement("span", null),
        actions &&
            React.cloneElement(actions, __assign({}, rest, { className: classes.actions, bulkActions: bulkActions,
                exporter: exporter,
                filters: filters }))));
};
ListToolbar.propTypes = {
    classes: PropTypes.object,
    filters: PropTypes.element,
    actions: PropTypes.element,
    bulkActions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
export default withStyles(styles)(ListToolbar);
