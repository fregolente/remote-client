import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as R from 'ramda';

// Material UI
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';

// Constants
import * as routes from '~/constants/routes';

// Components
import PapperBlock from '~/components/papperBlock';

import styles from '../style';


// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      primary: '',
      password: '',
    }
  }

  login = () => {
    console.group('Logging in');
    console.log('You are logging in as:')
    console.log(this.state);
    console.groupEnd('Logging in');
    this.props.push(routes.EXPLORER);
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleInputChange = event => {
    const capitalize = R.compose(
      R.join(''),
      R.juxt([R.compose(R.toUpper, R.head), R.tail])
    );;

    const idToVarName = (id) => {
      const nameArr = id.split('-');
      let returnName = null;
      nameArr.forEach((value, index) => {
        if (index === 0) {
          returnName = value;
        } else {
          returnName = returnName.concat(capitalize(value));
        }
      })

      return returnName;
    }


    if (event) {
      const name = event.target.id;
      const varName = idToVarName(name);

      const value = event.target.value;
      this.setState({ [varName]: value });
    }
  }

  goToRegister = () => {
    this.props.push(routes.REGISTER);
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting
    } = this.props;
    return (
      <div className={classes.formWrap}>
        <PapperBlock whiteBg title="Login" desc="">
          <form>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="primary">Username or Email</InputLabel>
                <Input id="primary" value={this.state.primary} onChange={this.handleInputChange} />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" onClick={() => this.login()}>
                Login
              <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
              </Button>
            </div>
            <div className={classes.footer}>
              Don't have a user?
            <Button
                onClick={() => this.goToRegister()}
                size="small"
                color="secondary"
                className={classes.button}>
                Register
              </Button>
            </div>
          </form>
        </PapperBlock>
      </div >
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  push,
};


const LoginFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default withStyles(styles)(LoginFormMapped);
