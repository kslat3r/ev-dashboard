import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

const styles = () => ({

});

const ErrorDialog = props => {
  const {
    message
  } = props;

  const [open, handleClose] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => handleClose()}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity="error"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

ErrorDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(ErrorDialog)
