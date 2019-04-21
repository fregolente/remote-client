import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

// Material Imports
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';

// Components
import Type from '~/styles/components/Typography.scss';
import LoginForm from '~/components/forms/loginForm';
import PageHelmet from '~/components/pageHelmet';

import styles from './style';

// Utilities
import brand from '~/utilities/brand';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.inputs = {
      userNameOrEmail: null,
      password: null,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PageHelmet title="Login" />
        <div className={classes.container}>
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item container justify="center" spacing={0} className={classes.loginWrap}>
              <Hidden smDown>
                <Grid item md={6} className={classes.welcomeWrap}>
                  {/* Welcome Login */}
                  <div className={classes.welcome}>
                    <div className={classes.welcomeContent}>
                      <div className={classes.brand} />
                      <Typography variant="h2" className={classes.brandCall}>Hello there,</Typography>
                      <Typography variant="h6" className={classes.brandText}>
                        <span className={Type.regular}>
                          welcome to {brand.name}
                        </span>
                      </Typography>
                    </div>
                    {/* <ArrowForward className={classes.decoBottom} /> */}
                  </div>
                </Grid>
              </Hidden>
              <Grid item md={6} sm={8} xs={11} className={classes.formContainer}>
                {/* ----------------------------------------------------------------------*/}
                {/* Load Login Form */}
                <LoginForm
                  handleSubmit={() => true}
                  pristine
                  submitting={false} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Login.defaultProps = {
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login)));
