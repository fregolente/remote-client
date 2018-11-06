import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Radium from 'radium';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Field, reduxForm } from 'redux-form/immutable';

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

import PapperBlock from '~/components/papperBlock';
import DownshiftMultiple from '~/components/downshiftMultiple';

import { getFromLocalStorage } from '~/utilities/localStorage';
import { parseRegisterFormDataToMongoUser } from '~/utilities/user';

// Actions
import { createUserRequested } from '~/state/register/actions';

import styles from '../style';
// fix styles
import * as registerFormStyle from './style';

// validation functions
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
    this.state = {
      userType: '2',
      gender: '1',
      termsAgree: false,
    };
  }

  componentWillMount() {
    this.utilities = getFromLocalStorage('utilities');
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

  submitForm = () => {
    const {
      graduationDate,
      userType,
      gender,
    } = this.state;

    const passOnState = R.omit(['confirmPassword'], this.state);

    const formValues = {
      ...passOnState,
      graduationDate: moment(graduationDate).format("YYYY-MM-DD HH:mm:ss"),
      userType: R.find(R.propEq('value', Number(userType)))(this.utilities.userType),
      gender: R.find(R.propEq('value', Number(gender)))(this.utilities.gender)
    };

    const parsedUser = parseRegisterFormDataToMongoUser(formValues)

    this.props.createUser(parsedUser);

    this.props.handleSubmit();
  }

  renderOptions = (optionsArray) => {
    return optionsArray.map((option) => {
      return (<FormControlLabel key={option.id} value={option.value.toString()} control={<Radio />} label={option.label} />);
    });
  }

  onSelectPracticeArea = (selectedValues) => {
    this.setState({ practiceArea: [...selectedValues] });
  }

  onSelectUserRegion = (selectedValues) => {
    this.setState({ userRegion: [...selectedValues] });
  }

  renderLawyerInfo = () => {
    const { classes } = this.props;
    const { practiceArea } = this.utilities;

    if (this.state.userType === '1') {
      return (<div>
        <Typography variant="button" className={classes.divider}>
          Lawyer Information
        </Typography>
        <div>
          <FormControl className={classes.formControl}>
            <DownshiftMultiple
              id={'practice-area'}
              onValueSelect={this.onSelectPracticeArea}
              selectValues={practiceArea}
              label={'Practice Area'}
              placeholder={'Start typing a practice area'} />
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
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" value={this.state.username} onChange={this.handleInputChange} />
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
              <DownshiftMultiple
                id={'user-region'}
                onValueSelect={this.onSelectUserRegion}
                selectValues={userRegion}
                label={'User Region'}
                placeholder={'Start typing a region'} />
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
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  createUser: createUserRequested,
};

const RegisterFormConnected = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

export default withStyles(styles)(Radium(RegisterFormConnected));
