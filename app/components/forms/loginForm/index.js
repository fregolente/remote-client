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
import { USER_TOKEN } from '~/constants/localstorageItems';

// Actions
import { loginRequested } from '~/state/authorization/actions';
import { cleanUser, updateUser, getUserByIdRequest } from '~/state/currentUser/actions';

// Components
import PapperBlock from '~/components/papperBlock';

// Utilities
import { addToLocalStorage, cleanLocalStorage, getFromLocalStorage } from '~/utilities/localStorage';

import styles from '../style';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    }
  }

  componentWillMount() {
    this.props.cleanUser();
    cleanLocalStorage(USER_TOKEN);
  }

  loginCallback = (response) => {
    if (response.message) {
      this.setState({ errorMessage: response.message })
    } else {
      const { user, token } = response;
      this.props.updateUser(user);
      const sanitizedToken = token.replace(/"/g, '');
      addToLocalStorage(USER_TOKEN, sanitizedToken.toString());

      const tokenens = getFromLocalStorage(USER_TOKEN);

      if (user.userType.value === 1) {
        this.props.push(routes.EXPLORER);
      } else {
        this.props.push(routes.MY_CASES);
      }
    }
  }

  login = () => {
    const { email, password } = this.state;
    this.props.requestLogin(email, password, this.loginCallback);
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleInputChange = (event) => {
    const capitalize = R.compose(
      R.join(''),
      R.juxt([R.compose(R.toUpper, R.head), R.tail])
    );

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
    } = this.props;
    return (
      <div className={classes.formWrap}>
        <PapperBlock whiteBg title="Login" desc="">
          <form>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" value={this.state.email} onChange={this.handleInputChange} />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
              </FormControl>
            </div>
            <div>
              <span> {this.state.errorMessage} </span>
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
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  requestLogin: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  cleanUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

const mapDispatchToProps = {
  push,
  requestLogin: loginRequested,
  updateUser,
  cleanUser,
  getUserByIdRequest,
};


const LoginFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default withStyles(styles)(LoginFormMapped);
