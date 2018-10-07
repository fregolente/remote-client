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

import Logo from '~/../static/images/logo.svg';
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

  componentWillMount() {
    // this.props.newLogin();
  }

  login = (e) => {
    e.preventDefault();
    // this.props.loginRequested(this.inputs.userNameOrEmail.value, this.inputs.password.value);
  };

  submitForm(values) {
    console.info('form values: ', JSON.stringify(values, null, 2));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PageHelmet title="Login" />
        <div className={classes.container}>
          <Grid container spacing={24} alignItems="center" direction="row" justify="center">
            <Grid item container justify="center" spacing={0} className={classes.loginWrap}>
              <Hidden smDown>
                <Grid item md={6} className={classes.welcomeWrap}>
                  {/* Welcome Login */}
                  <div className={classes.welcome}>
                    <div className={classes.welcomeContent}>
                      <div className={classes.brand}>
                        <img src={Logo} alt={brand.name} />
                        <h3>{brand.name}</h3>
                      </div>
                      <Typography variant="display2">
                        <span className={Type.light}>Hello there,</span>
                      </Typography>
                      <Typography variant="title" className={classes.brandText}>
                        <span className={Type.regular}>
                          Welcome to {brand.name}!
                        </span>
                      </Typography>
                    </div>
                    <ArrowForward className={classes.decoBottom} />
                  </div>
                </Grid>
              </Hidden>
              <Grid item md={6} sm={8} xs={11}>
                {/* ----------------------------------------------------------------------*/}
                {/* Load Login Form */}
                <LoginForm
                  handleSubmit={(values) => this.submitForm(values)}
                  pristine={true}
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
