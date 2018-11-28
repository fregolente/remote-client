import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material Imports
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';

// Components
import RegisterForm from '~/components/forms/registerForm/index.js';
import PageHelmet from '~/components/pageHelmet';

// Utilities
import brand from '~/utilities/brand';

import Logo from '../../../static/images/logo.svg';
import styles from './style';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      valueForm: [],
    };
  }

  submitForm(values) {
    if (false) {
      window.location.href = '/App/Profile';
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PageHelmet title="Register" />
        <div className={classes.container}>
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item container justify="center" spacing={0} className={classes.loginWrap}>
              <Hidden smDown>
                <Grid item md={5} className={classes.welcomeWrap}>
                  {/* Welcome Login */}
                  <div className={classes.welcome}>
                    <div className={classes.welcomeContent}>
                      <div className={classes.brand}>
                        <h3>{brand.name}</h3>
                      </div>
                      <Typography variant="h4">
                        <span className="light">Nice to meet You :)</span>
                      </Typography>
                    </div>
                    <ArrowForward className={classes.decoBottom} />
                  </div>
                </Grid>
              </Hidden>
              <Grid item md={7} sm={8} xs={11} className={classes.formContainer}>
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
