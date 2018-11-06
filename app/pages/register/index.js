import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import brand from '~/utilities/brand';
import Logo from '../../../static/images/logo.svg';

import RegisterPage from '~/components/registerPage';

import styles from './styles';

class Register extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appFrameOuter}>
        <main className={classes.outerContent} id="mainContent">
          <Hidden mdUp>
            <div className={classes.brand}>
              <Logo />
              <h3>{brand.name}</h3>
            </div>
          </Hidden>
          <RegisterPage />
        </main>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
};

export default withRouter((withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Register))));
