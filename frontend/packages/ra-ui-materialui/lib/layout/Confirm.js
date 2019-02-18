"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
var DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var styles_1 = require("@material-ui/core/styles");
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var CheckCircle_1 = __importDefault(require("@material-ui/icons/CheckCircle"));
var ErrorOutline_1 = __importDefault(require("@material-ui/icons/ErrorOutline"));
var classnames_1 = __importDefault(require("classnames"));
var compose_1 = __importDefault(require("recompose/compose"));
var ra_core_1 = require("ra-core");
var styles = function (theme) { return ({
    confirmPrimary: {
        color: theme.palette.primary.main,
    },
    confirmWarning: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: colorManipulator_1.fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
    iconPaddingStyle: {
        paddingRight: '0.5em',
    },
}); };
/**
 * Confirmation dialog
 *
 * @example
 * <Confirm
 *     isOpen={true}
 *     title="Delete Item"
 *     content="Are you sure you want to delete this item?"
 *     confirm="Yes"
 *     confirmColor="primary"
 *     cancel="Cancel"
 *     onConfirm={() => { // do something }}
 *     onClose={() => { // do something }}
 * />
 */
var Confirm = function (_a) {
    var isOpen = _a.isOpen, title = _a.title, content = _a.content, confirm = _a.confirm, cancel = _a.cancel, confirmColor = _a.confirmColor, onConfirm = _a.onConfirm, onClose = _a.onClose, classes = _a.classes, translate = _a.translate;
    var _b;
    return (react_1.default.createElement(Dialog_1.default, { open: isOpen, onClose: onClose, "aria-labelledby": "alert-dialog-title" },
        react_1.default.createElement(DialogTitle_1.default, { id: "alert-dialog-title" }, translate(title, { _: title })),
        react_1.default.createElement(DialogContent_1.default, null,
            react_1.default.createElement(DialogContentText_1.default, null, translate(content, { _: content }))),
        react_1.default.createElement(DialogActions_1.default, null,
            react_1.default.createElement(Button_1.default, { onClick: onClose },
                react_1.default.createElement(ErrorOutline_1.default, { className: classes.iconPaddingStyle }),
                translate(cancel, { _: cancel })),
            react_1.default.createElement(Button_1.default, { onClick: onConfirm, className: classnames_1.default('ra-confirm', (_b = {},
                    _b[classes.confirmWarning] = confirmColor === 'warning',
                    _b[classes.confirmPrimary] = confirmColor === 'primary',
                    _b)), autoFocus: true },
                react_1.default.createElement(CheckCircle_1.default, { className: classes.iconPaddingStyle }),
                translate(confirm, { _: confirm })))));
};
Confirm.propTypes = {
    cancel: prop_types_1.default.string.isRequired,
    classes: prop_types_1.default.object.isRequired,
    confirm: prop_types_1.default.string.isRequired,
    confirmColor: prop_types_1.default.string.isRequired,
    content: prop_types_1.default.string.isRequired,
    isOpen: prop_types_1.default.bool,
    onClose: prop_types_1.default.func.isRequired,
    onConfirm: prop_types_1.default.func.isRequired,
    title: prop_types_1.default.string.isRequired,
    translate: prop_types_1.default.func.isRequired,
};
Confirm.defaultProps = {
    cancel: 'ra.action.cancel',
    classes: {},
    confirm: 'ra.action.confirm',
    confirmColor: 'primary',
    isOpen: false,
};
exports.default = compose_1.default(styles_1.withStyles(styles), ra_core_1.translate)(Confirm);
