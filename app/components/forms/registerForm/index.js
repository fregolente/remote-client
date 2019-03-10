import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as R from 'ramda';
import Radium from 'radium';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Checkbox from '@material-ui/core/Checkbox';

import { DatePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import MultiChipSelect from '~/components/downshiftMultiple';
import PapperBlock from '~/components/papperBlock';

import { addToLocalStorage, getFromLocalStorage } from '~/utilities/localStorage';
import { parseRegisterFormDataToMongoUser } from '~/utilities/user';

import * as routes from '~/constants/routes';
import { USER_TOKEN } from '~/constants/localstorageItems';

// Actions
import { createUserRequested } from '~/state/register/actions';
import { updateUser, getUserByIdRequest } from '~/state/currentUser/actions';

import styles from '../style';
// fix styles
import * as registerFormStyle from './style';

// TODO: validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.props = props
    this.utilities = getFromLocalStorage('utilities');

    this.state = {
      userType: '2',
      gender: '1',
      termsAgree: false,
      errorMessage: '',
      userRegion: [],
      userRegionInput: '',
      userRegionOptions: this.utilities.userRegion,
      practiceArea: [],
      practiceAreaInput: '',
      practiceAreaOptions: this.utilities.practiceArea,
    };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  }

  handleRadioChange = name => event => {
    if (event) {
      const value = event.target.value;
      if (name === 'gender' && value !== '3') {
        this.setState({ customGender: '' });
      }
      this.setState({ [name]: value });
    }
  }

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

  handleDateChange = (date) => {
    this.setState({ graduationDate: date });
  }

  handleTermsChange = () => {
    this.setState({ termsAgree: !this.state.termsAgree });
  }

  formSubmitCallback = (response) => {
    if (response.success === false) {
      this.setState({ errorMessage: response.error })
    } else {
      const { user, token } = response;
      this.props.updateUser(user);
      addToLocalStorage(USER_TOKEN, token)
      if (user.userType.value === 1) {
        this.props.push(routes.EXPLORER);
      } else {
        this.props.push(routes.MY_CASES);
      }
    }
  }

  submitForm = () => {
    const {
      graduationDate,
      userType,
      gender,
      userRegion,
      practiceArea,
    } = this.state;

    const passOnState = R.omit(['confirmPassword',
      'userRegionInput',
      'userRegionOptions',
      'practiceAreaInput',
      'practiceAreaOptions'], this.state);

    const formValues = {
      ...passOnState,
      graduationDate: moment(graduationDate).format("YYYY-MM-DD HH:mm:ss"),
      userType: R.find(R.propEq('value', Number(userType)))(this.utilities.userType),
      gender: R.find(R.propEq('value', Number(gender)))(this.utilities.gender),
      userRegion: userRegion.map(region => R.find(R.propEq('label', region))(this.utilities.userRegion)),
      practiceArea: practiceArea.map(area => R.find(R.propEq('label', area))(this.utilities.practiceArea)),
    };

    const parsedUser = parseRegisterFormDataToMongoUser(formValues)
    this.props.createUser(parsedUser, this.formSubmitCallback);
  }

  renderOptions = (optionsArray) => {
    return optionsArray.map((option) => {
      return (<FormControlLabel key={option.id} value={option.value.toString()} control={<Radio />} label={option.label} />);
    });
  }

  handlePracticeAreaChange = selectedItem => {
    if (this.state.practiceAreaOptions.includes(selectedItem)) {
      this.removeSelectedPracticeArea(selectedItem);
    } else {
      this.addSelectedPracticeArea(selectedItem);
    }
  };

  addSelectedPracticeArea(item) {
    this.setState(({ practiceArea }) => ({
      practiceAreaInput: '',
      practiceArea: [...practiceArea, item],
    }));
  }

  removeSelectedPracticeArea = item => {
    this.setState(({ practiceArea }) => ({
      practiceAreaInput: '',
      practiceArea: practiceArea.filter(i => i !== item),
    }));
  };

  handlePracticeAreaChangeInput = inputVal => {
    const t = inputVal.split(",");
    if (JSON.stringify(t) !== JSON.stringify(this.state.practiceArea)) {
      this.setState({ practiceAreaInput: inputVal });
    }
  };

  renderLawyerInfo = () => {
    const { classes } = this.props;

    if (this.state.userType === '1') {
      return (<div>
        <Typography variant="button" className={classes.divider}>
          Lawyer Information
        </Typography>
        <div>
          <FormControl className={classes.formControl}>
            <MultiChipSelect
              id={'practice-area'}
              label={'Practice Area'}
              onChange={this.handlePracticeAreaChange}
              selectedItem={this.state.practiceArea}
              onRemoveItem={this.removeSelectedPracticeArea}
              inputValue={this.state.practiceAreaInput}
              onInputValueChange={this.handlePracticeAreaChangeInput}
              availableItems={this.state.practiceAreaOptions} />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="graduated-institution">Graduated Institution</InputLabel>
            <Input id="graduated-institution" value={this.state.institution} onChange={this.handleInputChange} />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                keyboard
                label="Graduation date"
                format="MM/DD/YYYY"
                placeholder="12/10/2018"
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                value={this.state.graduationDate}
                onChange={this.handleDateChange}
                maxDate={new Date()}
                animateYearScrolling={false} />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="linkedin-url">Linkedin URL</InputLabel>
            <Input
              id="linkedin-url"
              value={this.state.linkedinURL}
              onChange={this.handleInputChange}
              startAdornment={<InputAdornment position="start">http://</InputAdornment>} />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="biography">Biography</InputLabel>
            <Input
              id="biography"
              value={this.state.biography}
              onChange={this.handleInputChange}
              multiline />
          </FormControl>
        </div>
      </div>);
    }

    return null;
  }



  handleUserRegionChange = selectedItem => {
    if (this.state.userRegionOptions.includes(selectedItem)) {
      this.removeSelectedUserRegion(selectedItem);
    } else {
      this.addSelectedUserRegion(selectedItem);
    }
  };

  addSelectedUserRegion(item) {
    this.setState(({ userRegion }) => ({
      userRegionInput: '',
      userRegion: [...userRegion, item],
    }));
  }

  removeSelectedUserRegion = item => {
    this.setState(({ userRegion }) => ({
      userRegionInput: '',
      userRegion: userRegion.filter(i => i !== item),
    }));
  };

  handleUserRegionChangeInput = inputVal => {
    const t = inputVal.split(",");
    if (JSON.stringify(t) !== JSON.stringify(this.state.userRegion)) {
      this.setState({ userRegionInput: inputVal });
    }
  };

  render() {
    const {
      classes,
    } = this.props;

    const {
      gender,
      userType,
      userRegion,
    } = this.utilities;

    return (
      <div className={classes.formWrap} >
        <PapperBlock whiteBg title="Create New Account" desc="">
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="first">First Name</InputLabel>
              <Input id="first" value={this.state.first} onChange={this.handleInputChange} autoFocus />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="last">Last Name</InputLabel>
              <Input id="last" value={this.state.last} onChange={this.handleInputChange} />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" type="email" value={this.state.email} onChange={this.handleInputChange} />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input id="phone" value={this.state.phone} onChange={this.handleInputChange} />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
              <Input id="confirm-password" type="password" value={this.state.confirmPassword} onChange={this.handleInputChange} />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <MultiChipSelect
                id={'user-region'}
                label={'User Region'}
                onChange={this.handleUserRegionChange}
                selectedItem={this.state.userRegion}
                onRemoveItem={this.removeSelectedUserRegion}
                inputValue={this.state.userRegionInput}
                onInputValueChange={this.handleUserRegionChangeInput}
                availableItems={this.state.userRegionOptions} />
            </FormControl>
          </div>
          <div>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="gender"
                className={classes.group}
                value={this.state.gender}
                onChange={this.handleRadioChange('gender')}
                style={registerFormStyle.radioGroup}>
                {this.renderOptions(gender)}
              </RadioGroup>
            </FormControl>
          </div>

          {this.state.gender === '3' && <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="custom-gender">Custom Gender</InputLabel>
              <Input id="custom-gender" value={this.state.customGender} onChange={this.handleInputChange} />
            </FormControl>
          </div>}

          <div>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">User Type</FormLabel>
              <RadioGroup
                aria-label="v"
                name="userType"
                className={classes.group}
                value={this.state.userType}
                onChange={this.handleRadioChange('userType')}
                style={registerFormStyle.radioGroup}>
                {this.renderOptions(userType)}
              </RadioGroup>
            </FormControl>
          </div>

          {this.renderLawyerInfo()}

          {this.state.errorMessage !== '' &&
            (<div>
              <Typography
                color="error"
                variant="subtitle1">
                {this.state.errorMessage}
              </Typography>
            </div>)
          }

          <div className={classNames(classes.btnArea, classes.noMargin)}>
            <div className={classes.optArea}>
              <FormControlLabel
                label="Agree with"
                control={
                  <Checkbox
                    className={classes.agree}
                    checked={this.state.termsAgree}
                    onChange={this.handleTermsChange}
                    value="termsAgree" />} />
              <a href="#" className={classes.link}>Terms &amp; Condition</a>
            </div>
            <Button
              disabled={!this.state.termsAgree}
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: '40%' }}
              onClick={() => this.submitForm()}>
              Continue <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={!this.state.termsAgree} />
            </Button>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  createUser: createUserRequested,
  push,
  updateUser,
  getUserByIdRequest,
};

const RegisterFormConnected = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

export default withStyles(styles)(Radium(RegisterFormConnected));
