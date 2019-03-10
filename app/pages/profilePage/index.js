import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Radium from 'radium';
import moment from 'moment';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MultiChipSelect from '~/components/downshiftMultiple';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import { DatePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import Cover from '~/components/cover';
import PageHelmet from '~/components/pageHelmet';

// Utilities
import { getFromLocalStorage } from '~/utilities/localStorage';
import { parseRegisterFormDataToMongoUser } from '~/utilities/user';

// Actions
import { editUserRequest } from '~/state/currentUser/actions';

const userAvatar = '/images/avatars/pp_boy2.svg';

import * as styles from './styles';
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props = props

    this.utilities = getFromLocalStorage('utilities');

    this.state = {
      contentHeight: window.innerHeight - 370,
      editProfile: false,
      biography: '',
      userRegionInput: '',
      userRegionOptions: this.utilities.userRegion,
      practiceAreaInput: '',
      practiceAreaOptions: this.utilities.practiceArea,
    };
  }

  componentWillMount() {
    this.parseStateToForm();
  }

  parseStateToForm = () => {
    const { user } = this.props;
    let lawyerInfo = {};
    let userRegionSelected = [];
    let practiceAreaSelected = [];

    if (user.userRegion) {
      userRegionSelected = user.userRegion.map(region => region.label);
    }

    if (user.userType.value === 1) {
      if (user.lawyerInfo.practiceArea) {
        const { practiceArea } = this.utilities;
        practiceAreaSelected = user.lawyerInfo.practiceArea.map(areaId => {
          const area = practiceArea.filter(area => area.id === areaId)[0];
          return area.label;
        });
      }
    }

    if (user.userType.value === 1) {
      lawyerInfo = R.omit(['practiceArea'], user.lawyerInfo);
    }

    this.setState({
      id: user._id,
      first: user.first,
      last: user.last,
      email: user.email,
      phone: user.phone,
      userRegion: userRegionSelected,
      practiceArea: practiceAreaSelected,
      userType: user.userType.value.toString(),
      gender: user.gender.value.toString(),
      customGender: user.customGender,
      ...lawyerInfo,
    });
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

  handleEditChange = () => {
    this.setState({ editProfile: !this.state.editProfile });
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
    if (this.state.userType === '1') {
      return (<div>
        <Typography variant="button">
          Lawyer Information
        </Typography>
        <div style={styles.formRow}>
          <FormControl style={styles.readOnlySelect}>
            {!this.state.editProfile && (<Typography style={styles.selectLabelStyle} variant="caption">
              Practice Area
            </Typography>)}
            <div>
              <MultiChipSelect
                id={'practice-area'}
                label={'Practice Area'}
                onChange={this.handlePracticeAreaChange}
                readOnly={!this.state.editProfile}
                selectedItem={this.state.practiceArea}
                onRemoveItem={this.removeSelectedPracticeArea}
                inputValue={this.state.practiceAreaInput}
                onInputValueChange={this.handlePracticeAreaChangeInput}
                availableItems={this.state.practiceAreaOptions} />
            </div>
          </FormControl>
        </div>
        <div style={styles.formRow}>
          <FormControl style={styles.formGroupField}>
            <InputLabel htmlFor="institution">Graduated Institution</InputLabel>
            <Input id="institution" value={this.state.institution} onChange={this.handleInputChange} readOnly={!this.state.editProfile} />
          </FormControl>
        </div>
        <div style={styles.formRow}>
          <FormControl style={styles.formGroupField}>
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
                animateYearScrolling={false}
                InputProps={{
                  inputProps: {
                    readOnly: !this.state.editProfile,
                  }
                }} />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <div style={styles.formRow}>
          <FormControl style={styles.formGroupField}>
            <InputLabel htmlFor="linkedin-URL">Linkedin URL</InputLabel>
            <Input
              id="linkedin-URL"
              value={this.state.linkedinURL}
              onChange={this.handleInputChange}
              readOnly={!this.state.editProfile}
              startAdornment={<InputAdornment position="start">http://</InputAdornment>} />
          </FormControl>
        </div>
        <div style={styles.formRow}>
          <FormControl style={styles.formGroupField}>
            <InputLabel htmlFor="biography">Biography</InputLabel>
            <Input
              id="biography"
              value={this.state.biography}
              onChange={this.handleInputChange}
              readOnly={!this.state.editProfile}
              multiline />
          </FormControl>
        </div>
      </div>);
    }

    return null;
  }

  renderOptions = (optionsArray) => {
    return optionsArray.map((option) => {
      return (<FormControlLabel
        key={option.id}
        value={option.value.toString()}
        control={<Radio />}
        label={option.label}
        disabled={!this.state.editProfile} />);
    });
  }

  toggleEditProfile = () => {
    this.setState({ editProfile: !this.state.editProfile })
  }

  onSelectPracticeArea = (selectedValues) => {
    this.setState({ practiceArea: [...selectedValues] });
  }

  onSubmit = () => {
    const {
      graduationDate,
      userType,
      gender,
      userRegion,
      practiceArea,
    } = this.state;

    const passOnState = R.omit(['editProfile',
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

    const parsedUser = parseRegisterFormDataToMongoUser(formValues);
    this.props.editUserRequest(parsedUser);
    this.setState({ editProfile: !this.state.editProfile });
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
      gender,
    } = this.utilities;

    window.addEventListener('resize', () => {
      this.setState({ contentHeight: window.innerHeight - 370 });
    });

    return (
      <Grid container>
        <PageHelmet title="My Profile" />
        <Cover
          coverImg="/images/material_bg.svg"
          avatar={userAvatar}
          name={`${this.state.first} ${this.state.last}`}
          desc={this.state.biography} />

        <Grid container alignItems='center'>
          <Grid item sm={1} xs={false} />
          <Grid item sm={10} xs={12}>
            <Card id="user-edit-card" style={{ maxHeight: `${this.state.contentHeight}px`, overflowY: 'auto' }}>
              <CardContent>
                { /* Button to enable editing */
                  this.state.editProfile ?
                    (<div style={styles.topButtonGroup}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginRight: '10px' }}
                        onClick={() => this.toggleEditProfile()}>
                        Cancel editing
                    </Button>
                      <Button
                        disabled={!this.state.editProfile}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => this.onSubmit()}>
                        Save
                        </Button>
                    </div>) :
                    (<div style={styles.topButtonGroup}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => this.toggleEditProfile()}>
                        Edit Profile
                        </Button>
                    </div>)
                }

                <div style={styles.formRow}>
                  <FormControl style={styles.formGroupField}>
                    <InputLabel htmlFor="first">First Name</InputLabel>
                    <Input
                      id="first"
                      value={this.state.first}
                      onChange={this.handleInputChange}
                      readOnly={!this.state.editProfile} />
                  </FormControl>

                  <FormControl style={styles.formGroupField}>
                    <InputLabel htmlFor="last">Last Name</InputLabel>
                    <Input id="last" value={this.state.last} onChange={this.handleInputChange} readOnly={!this.state.editProfile} />
                  </FormControl>
                </div>
                <div style={styles.formRow}>
                  <FormControl style={styles.formGroupField}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" type="email" value={this.state.email} onChange={this.handleInputChange} readOnly={true} />
                  </FormControl>
                </div>
                <div style={styles.formRow}>
                  <FormControl style={styles.formGroupField}>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input id="phone" value={this.state.phone} onChange={this.handleInputChange} readOnly={!this.state.editProfile} />
                  </FormControl>


                  <FormControl style={styles.readOnlySelect}>
                    {!this.state.editProfile && (<Typography style={styles.selectLabelStyle} variant="button">
                      User Region
                    </Typography>)}
                    <div id="multi-chip=select">
                      <MultiChipSelect
                        id={'user-region'}
                        label={'User Region'}
                        onChange={this.handleUserRegionChange}
                        readOnly={!this.state.editProfile}
                        selectedItem={this.state.userRegion}
                        onRemoveItem={this.removeSelectedUserRegion}
                        inputValue={this.state.userRegionInput}
                        onInputValueChange={this.handleUserRegionChangeInput}
                        availableItems={this.state.userRegionOptions} />
                    </div>
                  </FormControl>
                </div>
                <div id="genderRadioGroup" style={styles.formRow}>
                  <div style={styles.formGroupField}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup
                        aria-label="Gender"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.handleRadioChange('gender')}
                        style={styles.radioGroup} >
                        {this.renderOptions(gender)}
                      </RadioGroup>
                    </FormControl>
                  </div>
                  {this.state.gender === '3' &&
                    <FormControl style={styles.formGroupField}>
                      <InputLabel htmlFor="custom-gender">Custom Gender</InputLabel>
                      <Input
                        id="custom-gender"
                        value={this.state.customGender}
                        onChange={this.handleInputChange}
                        disabled={!this.state.editProfile} />
                    </FormControl>
                  }
                </div>


                {this.renderLawyerInfo()}

              </CardContent>
              <CardActions>

              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.currentUser,
});

const mapDispatchToProps = {
  editUserRequest,
};

const ProfilePageConnected = connect(mapStateToProps, mapDispatchToProps)(Radium(ProfilePage));

export default ProfilePageConnected;