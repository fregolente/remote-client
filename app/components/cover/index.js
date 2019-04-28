import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class Cover extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const {
      classes,
      avatar,
      name,
      desc,
      coverImg,
    } = this.props;

    return (
      <div className={classes.cover} style={{ backgroundImage: `url(${coverImg})`, backgroundSize: '100%' }}>
        <div className={classes.content}>
          <Avatar alt={name} src={avatar} className={classes.avatar} />
          <Typography variant="h4" className={classes.name} gutterBottom>
            {name}
          </Typography>
          <Typography className={classes.subheading} gutterBottom>
            {desc}
          </Typography>
        </div>
      </div>
    );
  }
}

Cover.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
};

export default withStyles(styles)(Cover);
