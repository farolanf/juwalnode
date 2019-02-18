import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionCheck from '@material-ui/icons/CheckCircle';
import AlertError from '@material-ui/icons/ErrorOutline';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { translate } from 'ra-core';
var styles = function (theme) { return ({
    confirmPrimary: {
        color: theme.palette.primary.main,
    },
    confirmWarning: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
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
    return (React.createElement(Dialog, { open: isOpen, onClose: onClose, "aria-labelledby": "alert-dialog-title" },
        React.createElement(DialogTitle, { id: "alert-dialog-title" }, translate(title, { _: title })),
        React.createElement(DialogContent, null,
            React.createElement(DialogContentText, null, translate(content, { _: content }))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onClose },
                React.createElement(AlertError, { className: classes.iconPaddingStyle }),
                translate(cancel, { _: cancel })),
            React.createElement(Button, { onClick: onConfirm, className: classnames('ra-confirm', (_b = {},
                    _b[classes.confirmWarning] = confirmColor === 'warning',
                    _b[classes.confirmPrimary] = confirmColor === 'primary',
                    _b)), autoFocus: true },
                React.createElement(ActionCheck, { className: classes.iconPaddingStyle }),
                translate(confirm, { _: confirm })))));
};
Confirm.propTypes = {
    cancel: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    confirm: PropTypes.string.isRequired,
    confirmColor: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
};
Confirm.defaultProps = {
    cancel: 'ra.action.cancel',
    classes: {},
    confirm: 'ra.action.confirm',
    confirmColor: 'primary',
    isOpen: false,
};
export default compose(withStyles(styles), translate)(Confirm);
