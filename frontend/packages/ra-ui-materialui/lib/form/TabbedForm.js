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
var classnames_1 = __importDefault(require("classnames"));
var redux_form_1 = require("redux-form");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var compose_1 = __importDefault(require("recompose/compose"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var Tabs_1 = __importDefault(require("@material-ui/core/Tabs"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var Toolbar_1 = __importDefault(require("./Toolbar"));
var CardContentInner_1 = __importDefault(require("../layout/CardContentInner"));
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
        var validTabPaths = react_1.Children.toArray(children).map(function (tab, index) {
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
        return (react_1.default.createElement("form", __assign({ className: classnames_1.default('tabbed-form', className), key: version }, sanitizeRestProps(rest)),
            react_1.default.createElement(Tabs_1.default
            // The location pathname will contain the page path including the current tab path
            // so we can use it as a way to determine the current tab
            , { 
                // The location pathname will contain the page path including the current tab path
                // so we can use it as a way to determine the current tab
                value: tabsValue, indicatorColor: "primary" }, react_1.Children.map(children, function (tab, index) {
                if (!tab)
                    return null;
                // Builds the full tab tab which is the concatenation of the last matched route in the
                // TabbedShowLayout hierarchy (ex: '/posts/create', '/posts/12', , '/posts/12/show')
                // and the tab path.
                // This will be used as the Tab's value
                var tabPath = getTabFullPath(tab, index, match.url);
                return react_1.default.cloneElement(tab, {
                    context: 'header',
                    value: tabPath,
                    className: tabsWithErrors.includes(tab.props.label) &&
                        location.pathname !== tabPath
                        ? classes.errorTabButton
                        : null,
                });
            })),
            react_1.default.createElement(Divider_1.default, null),
            react_1.default.createElement(CardContentInner_1.default, null, react_1.Children.map(children, function (tab, index) {
                return tab && (react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: getTabFullPath(tab, index, match.url) }, function (routeProps) {
                    return react_1.default.cloneElement(tab, {
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
                react_1.default.cloneElement(toolbar, {
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
}(react_1.Component));
exports.TabbedForm = TabbedForm;
TabbedForm.propTypes = {
    basePath: prop_types_1.default.string,
    children: prop_types_1.default.node,
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    defaultValue: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.func]),
    handleSubmit: prop_types_1.default.func,
    invalid: prop_types_1.default.bool,
    location: prop_types_1.default.object,
    match: prop_types_1.default.object,
    pristine: prop_types_1.default.bool,
    record: prop_types_1.default.object,
    redirect: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.bool,
        prop_types_1.default.func,
    ]),
    resource: prop_types_1.default.string,
    save: prop_types_1.default.func,
    saving: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.bool]),
    submitOnEnter: prop_types_1.default.bool,
    tabsWithErrors: prop_types_1.default.arrayOf(prop_types_1.default.string),
    toolbar: prop_types_1.default.element,
    translate: prop_types_1.default.func,
    validate: prop_types_1.default.func,
    value: prop_types_1.default.number,
    version: prop_types_1.default.number,
};
TabbedForm.defaultProps = {
    submitOnEnter: true,
    toolbar: react_1.default.createElement(Toolbar_1.default, null),
};
var collectErrors = function (state, props) {
    var syncErrors = redux_form_1.getFormSyncErrors(props.form)(state);
    var asyncErrors = redux_form_1.getFormAsyncErrors(props.form)(state);
    var submitErrors = redux_form_1.getFormSubmitErrors(props.form)(state);
    return __assign({}, syncErrors, asyncErrors, submitErrors);
};
exports.findTabsWithErrors = function (state, props, collectErrorsImpl) {
    if (collectErrorsImpl === void 0) { collectErrorsImpl = collectErrors; }
    var errors = collectErrorsImpl(state, props);
    return react_1.Children.toArray(props.children).reduce(function (acc, child) {
        var inputs = react_1.Children.toArray(child.props.children);
        if (inputs.some(function (input) { return errors[input.props.source]; })) {
            return acc.concat([child.props.label]);
        }
        return acc;
    }, []);
};
var enhance = compose_1.default(react_router_dom_1.withRouter, react_redux_1.connect(function (state, props) {
    var children = react_1.Children.toArray(props.children).reduce(function (acc, child) { return acc.concat(react_1.Children.toArray(child.props.children)); }, []);
    return {
        form: props.form || ra_core_1.REDUX_FORM_NAME,
        initialValues: ra_core_1.getDefaultValues(state, __assign({}, props, { children: children })),
        saving: props.saving || state.admin.saving,
        tabsWithErrors: exports.findTabsWithErrors(state, __assign({ form: ra_core_1.REDUX_FORM_NAME }, props)),
    };
}), ra_core_1.translate, // Must be before reduxForm so that it can be used in validation
redux_form_1.reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
}), styles_1.withStyles(styles));
exports.default = enhance(TabbedForm);
