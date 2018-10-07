import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import brand from '~/utilities/brand';
import logo from '~/../static/images/logo.svg';

import Login from './components/loginPage';

import styles from './styles';

class LoginDedicated extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appFrameOuter}>
        <main className={classes.outerContent} id="mainContent">
          <Hidden mdUp>
            <div className={classes.brand}>
              <img src={logo} alt={brand.name} />
              <h3>{brand.name}</h3>
            </div>
          </Hidden>
          <Login />
        </main>
      </div>
    );
  }
}

LoginDedicated.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter((withStyles(styles)(LoginDedicated)));
