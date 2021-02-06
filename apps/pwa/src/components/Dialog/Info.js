import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';

const styles = () => ({

});

const InfoDialog = props => {
  const {
    title,
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
        severity="info"
      >
        <AlertTitle>
          {title}
        </AlertTitle>

        {message}
      </Alert>
    </Snackbar>
  );
};

InfoDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(InfoDialog)
