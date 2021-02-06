import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    height: 100,
    width: 100,
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: theme.palette.secondary.main
    }
  }
});

const Authorise = ({ classes, onClick }) => (
  <div
    className={classes.root}
  >
    <IconButton
      className={classes.icon}
      onClick={onClick}
      color="secondary"
    >
      <VpnKeyIcon
        fontSize="large"
      />
    </IconButton>
  </div>
);

export default withStyles(styles)(Authorise);
