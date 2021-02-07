import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import BatteryCharging20Icon from '@material-ui/icons/BatteryCharging20';
import BatteryCharging30Icon from '@material-ui/icons/BatteryCharging30';
import BatteryCharging50Icon from '@material-ui/icons/BatteryCharging50';
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import BatteryCharging80Icon from '@material-ui/icons/BatteryCharging80';
import BatteryCharging90Icon from '@material-ui/icons/BatteryCharging90';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import Battery20Icon from '@material-ui/icons/Battery20';
import Battery30Icon from '@material-ui/icons/Battery30';
import Battery50Icon from '@material-ui/icons/Battery50';
import Battery60Icon from '@material-ui/icons/Battery60';
import Battery80Icon from '@material-ui/icons/Battery80';
import Battery90Icon from '@material-ui/icons/Battery90';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';

const icons = {
  BatteryCharging20Icon,
  BatteryCharging30Icon,
  BatteryCharging50Icon,
  BatteryCharging60Icon,
  BatteryCharging80Icon,
  BatteryCharging90Icon,
  BatteryChargingFullIcon,
  Battery20Icon,
  Battery30Icon,
  Battery50Icon,
  Battery60Icon,
  Battery80Icon,
  Battery90Icon,
  BatteryFullIcon
};

const styles = theme => ({
  root: {
    width: 300
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2)
  },
  icon: {
    fontSize: 80
  }
});

const Details = ({ classes, vehicle }) => {
  const {
    latitude,
    longitude,
    isPluggedIn
  } = vehicle;

  let {
    percentRemaining
  } = vehicle;

  const {
    REACT_APP_GOOGLE_MAPS_API_KEY: key
  } = process.env;

  // map

  const gmapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=300x300&maptype=roadmap&key=${key}&markers=color:red%7C${latitude},${longitude}`;

  // charging icon

  let iconPrefix = 'Battery';

  if (isPluggedIn) {
    iconPrefix += 'Charging';
  }

  percentRemaining = (percentRemaining * 100).toFixed(2);

  if (percentRemaining <= 20) {
    iconPrefix += '20';
  } else if (percentRemaining > 20 && percentRemaining <= 30) {
    iconPrefix += '30';
  } else if (percentRemaining > 30 && percentRemaining <= 50) {
    iconPrefix += '50';
  } else if (percentRemaining > 50 && percentRemaining <= 60) {
    iconPrefix += '60';
  } else if (percentRemaining > 60 && percentRemaining <= 80) {
    iconPrefix += '80';
  } else if (percentRemaining > 80 && percentRemaining <= 90) {
    iconPrefix += '90';
  } else if (percentRemaining > 90 && percentRemaining <= 100) {
    iconPrefix += 'Full';
  }

  iconPrefix += 'Icon';

  const BatteryIcon = icons[iconPrefix];

  return (
    <div
      className={classes.root}
    >
      <div
        className={classes.map}
      >
        <img
          alt={`${latitude},${longitude}`}
          src={gmapUrl}
        />
      </div>

      <div
        className={classes.icons}
      >
        <Badge
          badgeContent={`${percentRemaining}%`}
          color="secondary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <BatteryIcon
            color="primary"
            className={classes.icon}
          />
        </Badge>
      </div>
    </div>
  );
};

export default withStyles(styles)(Details);
