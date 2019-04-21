import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material Imports
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

// Components
import RegisterForm from '~/components/forms/registerForm/index.js';
import PageHelmet from '~/components/pageHelmet';

import styles from './style';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} id="register-root">
        <PageHelmet title="Register" />
        <div className={classes.container}>
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item container justify="center" spacing={0} className={classes.loginWrap} id="login-wrap">
              <Hidden smDown>
                <Grid item md={6} className={classes.welcomeWrap}>
                  {/* Welcome Login */}
                  <div className={classes.welcome}>
                    <div className={classes.welcomeContent}>
                      <div className={classes.brand} />
                      <Typography variant="h2" className={classes.brandCall}>
                        Nice to meet you!
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Hidden>
              <Grid item md={6} sm={8} xs={11} className={classes.formContainer}>
                {/* ----------------------------------------------------------------------*/}
                {/* Load Register Form */}
                <RegisterForm handleSubmit={this.submitForm} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

const RegisterPageConnected = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export default withStyles(styles)(RegisterPageConnected);
