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
import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { reduxForm, getFormAsyncErrors, getFormSyncErrors, getFormSubmitErrors, } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import compose from 'recompose/compose';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';
import { getDefaultValues, translate, REDUX_FORM_NAME } from 'ra-core';
import Toolbar from './Toolbar';
import CardContentInner from '../layout/CardContentInner';
var styles = function (theme) { return ({
    errorTabButton: { color: theme.palette.error.main },
}); };
var sanitizeRestProps = function (_a) {
    var anyTouched = _a.anyTouched, array = _a.array, asyncBlurFields = _a.asyncBlurFields, asyncValidate = _a.asyncValidate, asyncValidating = _a.asyncValidating, autofill = _a.autofill, blur = _a.blur, change = _a.change, clearAsyncError = _a.clearAsyncError, clearFields = _a.clearFields, clearSubmit = _a.clearSubmit, clearSubmitErrors = _a.clearSubmitErrors, destroy = _a.destroy, dirty = _a.dirty, dispatch = _a.dispatch, form = _a.form, handleSubmit = _a.handleSubmit, initialize = _a.initialize, initialized = _a.initialized, initialValues = _a.initialValues, pristine = _a.pristine, pure = _a.pure, redirect = _a.redirect, reset = _a.reset, resetSection = _a.resetSection, save = _a.save, staticContext = _a.staticContext, submit = _a.submit, submitFailed = _a.submitFailed, submitSucceeded = _a.submitSucceeded, submitting = _a.submitting, touch = _a.touch, translate = _a.translate, triggerSubmit = _a.triggerSubmit, untouch = _a.untouch, valid = _a.valid, validate = _a.validate, props = __rest(_a, ["anyTouched", "array", "asyncBlurFields", "asyncValidate", "asyncValidating", "autofill", "blur", "change", "clearAsyncError", "clearFields", "clearSubmit", "clearSubmitErrors", "destroy", "dirty", "dispatch", "form", "handleSubmit", "initialize", "initialized", "initialValues", "pristine", "pure", "redirect", "reset", "resetSection", "save", "staticContext", "submit", "submitFailed", "submitSucceeded", "submitting", "touch", "translate", "triggerSubmit", "untouch", "valid", "validate"]);
    return props;
};
var getTabFullPath = function (tab, index, baseUrl) {
    return "" + baseUrl + (tab.props.path ? "/" + tab.props.path : index > 0 ? "/" + index : '');
};
var TabbedForm = /** @class */ (function (_super) {
    __extends(TabbedForm, _super);
    function TabbedForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmitWithRedirect = function (redirect) {
            if (redirect === void 0) { redirect = _this.props.redirect; }
            return _this.props.handleSubmit(function (values) { return _this.props.save(values, redirect); });
        };
        return _this;
    }
    TabbedForm.prototype.render = function () {
        var _a = this.props, basePath = _a.basePath, children = _a.children, className = _a.className, _b = _a.classes, classes = _b === void 0 ? {} : _b, invalid = _a.invalid, location = _a.location, match = _a.match, pristine = _a.pristine, record = _a.record, redirect = _a.redirect, resource = _a.resource, saving = _a.saving, submitOnEnter = _a.submitOnEnter, tabsWithErrors = _a.tabsWithErrors, toolbar = _a.toolbar, translate = _a.translate, value = _a.value, version = _a.version, rest = __rest(_a, ["basePath", "children", "className", "classes", "invalid", "location", "match", "pristine", "record", "redirect", "resource", "saving", "submitOnEnter", "tabsWithErrors", "toolbar", "translate", "value", "version"]);
        var validTabPaths = Children.toArray(children).map(function (tab, index) {
            return getTabFullPath(tab, index, match.url);
        });
        // This ensure we don't get warnings from material-ui Tabs component when
        // the current location pathname targets a dynamically added Tab
        // In the case the targeted Tab is not present at first render (when
        // using permissions for example) we temporarily switch to the first
        // available tab. The current location will be applied again on the
        // first render containing the targeted tab. This is almost transparent
        // for the user who may just see an short tab selection animation
        var tabsValue = validTabPaths.includes(location.pathname)
            ? location.pathname
            : validTabPaths[0];
        return (React.createElement("form", __assign({ className: classnames('tabbed-form', className), key: version }, sanitizeRestProps(rest)),
            React.createElement(Tabs
            // The location pathname will contain the page path including the current tab path
            // so we can use it as a way to determine the current tab
            , { 
                // The location pathname will contain the page path including the current tab path
                // so we can use it as a way to determine the current tab
                value: tabsValue, indicatorColor: "primary" }, Children.map(children, function (tab, index) {
                if (!tab)
                    return null;
                // Builds the full tab tab which is the concatenation of the last matched route in the
                // TabbedShowLayout hierarchy (ex: '/posts/create', '/posts/12', , '/posts/12/show')
                // and the tab path.
                // This will be used as the Tab's value
                var tabPath = getTabFullPath(tab, index, match.url);
                return React.cloneElement(tab, {
                    context: 'header',
                    value: tabPath,
                    className: tabsWithErrors.includes(tab.props.label) &&
                        location.pathname !== tabPath
                        ? classes.errorTabButton
                        : null,
                });
            })),
            React.createElement(Divider, null),
            React.createElement(CardContentInner, null, Children.map(children, function (tab, index) {
                return tab && (React.createElement(Route, { exact: true, path: getTabFullPath(tab, index, match.url) }, function (routeProps) {
                    return React.cloneElement(tab, {
                        context: 'content',
                        resource: resource,
                        record: record,
                        basePath: basePath,
                        hidden: !routeProps.match,
                        /**
                         * Force redraw when the tab becomes active
                         *
                         * This is because the fields, decorated by redux-form and connect,
                         * aren't redrawn by default when the tab becomes active.
                         * Unfortunately, some material-ui fields (like multiline TextField)
                         * compute their size based on the scrollHeight of a dummy DOM element,
                         * and scrollHeight is 0 in a hidden div. So they must be redrawn
                         * once the tab becomes active.
                         *
                         * @ref https://github.com/marmelab/react-admin/issues/1956
                         */
                        key: index + "_" + !routeProps.match,
                    });
                }));
            })),
            toolbar &&
                React.cloneElement(toolbar, {
                    basePath: basePath,
                    className: 'toolbar',
                    handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                    handleSubmit: this.props.handleSubmit,
                    invalid: invalid,
                    pristine: pristine,
                    record: record,
                    redirect: redirect,
                    resource: resource,
                    saving: saving,
                    submitOnEnter: submitOnEnter,
                })));
    };
    return TabbedForm;
}(Component));
export { TabbedForm };
TabbedForm.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    location: PropTypes.object,
    match: PropTypes.object,
    pristine: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
    save: PropTypes.func,
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    submitOnEnter: PropTypes.bool,
    tabsWithErrors: PropTypes.arrayOf(PropTypes.string),
    toolbar: PropTypes.element,
    translate: PropTypes.func,
    validate: PropTypes.func,
    value: PropTypes.number,
    version: PropTypes.number,
};
TabbedForm.defaultProps = {
    submitOnEnter: true,
    toolbar: React.createElement(Toolbar, null),
};
var collectErrors = function (state, props) {
    var syncErrors = getFormSyncErrors(props.form)(state);
    var asyncErrors = getFormAsyncErrors(props.form)(state);
    var submitErrors = getFormSubmitErrors(props.form)(state);
    return __assign({}, syncErrors, asyncErrors, submitErrors);
};
export var findTabsWithErrors = function (state, props, collectErrorsImpl) {
    if (collectErrorsImpl === void 0) { collectErrorsImpl = collectErrors; }
    var errors = collectErrorsImpl(state, props);
    return Children.toArray(props.children).reduce(function (acc, child) {
        var inputs = Children.toArray(child.props.children);
        if (inputs.some(function (input) { return errors[input.props.source]; })) {
            return acc.concat([child.props.label]);
        }
        return acc;
    }, []);
};
var enhance = compose(withRouter, connect(function (state, props) {
    var children = Children.toArray(props.children).reduce(function (acc, child) { return acc.concat(Children.toArray(child.props.children)); }, []);
    return {
        form: props.form || REDUX_FORM_NAME,
        initialValues: getDefaultValues(state, __assign({}, props, { children: children })),
        saving: props.saving || state.admin.saving,
        tabsWithErrors: findTabsWithErrors(state, __assign({ form: REDUX_FORM_NAME }, props)),
    };
}), translate, // Must be before reduxForm so that it can be used in validation
reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
}), withStyles(styles));
export default enhance(TabbedForm);
