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

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.props = props;
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
      openTermsDialog: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  handleRadioChange = name => (event) => {
    if (event) {
      const { value } = event.target;
      if (name === 'gender' && value !== '3') {
        this.setState({ customGender: '' });
      }
      this.setState({ [name]: value });
    }
  }

  handleInputChange = (event) => {
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
      graduationDate: moment(graduationDate).format('YYYY-MM-DD HH:mm:ss'),
      userType: R.find(R.propEq('value', Number(userType)))(this.utilities.userType),
      gender: R.find(R.propEq('value', Number(gender)))(this.utilities.gender),
      userRegion: userRegion.map(region => R.find(R.propEq('label', region))(this.utilities.userRegion)),
      practiceArea: practiceArea.map(area => R.find(R.propEq('label', area))(this.utilities.practiceArea)),
    };

    const parsedUser = parseRegisterFormDataToMongoUser(formValues)
    this.props.createUser(parsedUser, this.formSubmitCallback);
  }

  handlePracticeAreaChange = (selectedItem) => {
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

  removeSelectedPracticeArea = (item) => {
    this.setState(({ practiceArea }) => ({
      practiceAreaInput: '',
      practiceArea: practiceArea.filter(i => i !== item),
    }));
  };

  handlePracticeAreaChangeInput = (inputVal) => {
    const t = inputVal.split(",");
    if (JSON.stringify(t) !== JSON.stringify(this.state.practiceArea)) {
      this.setState({ practiceAreaInput: inputVal });
    }
  };

  handleUserRegionChange = (selectedItem) => {
    if (this.state.userRegionOptions.includes(selectedItem)) {
      this.removeSelectedUserRegion(selectedItem);
    } else {
      this.addSelectedUserRegion(selectedItem);
    }
  };

  handleUserRegionChangeInput = (inputVal) => {
    const t = inputVal.split(",");
    if (JSON.stringify(t) !== JSON.stringify(this.state.userRegion)) {
      this.setState({ userRegionInput: inputVal });
    }
  };

  addSelectedUserRegion(item) {
    this.setState(({ userRegion }) => ({
      userRegionInput: '',
      userRegion: [...userRegion, item],
    }));
  }

  removeSelectedUserRegion = (item) => {
    this.setState(({ userRegion }) => ({
      userRegionInput: '',
      userRegion: userRegion.filter(i => i !== item),
    }));
  };

  renderOptions = (optionsArray) => {
    return optionsArray.map((option) => {
      return (<FormControlLabel
        key={option.id}
        value={option.value.toString()}
        control={<Radio />}
        label={option.label} />);
    });
  }

  renderLawyerInfo = () => {
    const { classes } = this.props;

    if (this.state.userType === '1') {
      return (
        <div>
          <Typography variant="button" className={classes.divider}>
            Lawyer Information
          </Typography>
          <div>
            <FormControl className={classes.formControl}>
              <MultiChipSelect
                id="practice-area"
                label="Practice Area"
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
        </div>
      );
    }

    return null;
  }

  handleOpenDialog = () => {
    this.setState({ openTermsDialog: true });
  };

  handleClose = () => {
    this.setState({ openTermsDialog: false });
  };

  termsDialog = () => {
    return (
      <Dialog
        open={this.state.openTermsDialog}
        onClose={this.handleCloseApply}
        aria-labelledby="alert-dialog-title"
        maxWidth="md"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {'Terms and Conditions'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={styles.contentTextApplyDialog}>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Welcome to Remote Legal. This page contains terms and conditions for the use of Remote Legal’s website, mobile applications, products, and services (collectively "Remote Legal Services"). By accessing any Remote Legal website, mobile application, product, or service, you are agreeing to comply with and be bound by, as well as consenting to, all terms and conditions on this page.</p>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>&nbsp;</p>
            <ol>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Ability and authority to use Remote Legal</strong></li>
              <li style={{ textIndent: '36.0pt', lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Attorney</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 72.0pt' }}>You may only use Remote Legal Services if you are at or above the age of majority, and a licensed attorney in every jurisdiction in which you offer to perform services on Remote Legal. The age of majority shall be defined by the state in which you reside or use Remote Legal.</li>
              <li style={{ textIndent: '36.0pt', lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>User</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 72.0pt' }}><span style={{ background: 'white' }}>You may only use Remote Legal Services if you are at or above the age of majority. The age(s) of majority shall be defined by the state in which you reside and use Remote Legal. If you use Remote Legal Services on behalf of another person, business, or other entity, you are truthfully representing to Remote Legal that you have authority to act on that other person, business, or other entity’s behalf. You may not use Remote Legal Services for any commercial purpose.</span></li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Remote Legal is not a lawyer or law firm</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Remote Legal is not a lawyer or a law firm. Remote Legal does not employ the lawyers that use its site or services. We allow consumers of legal services the ability to search and filter through attorneys who do practice law. Remote Legal allows consumers to communicate with lawyers, and in doing so we are simply the intermediary or platform for this communication.</p>
            <ol>
              <li style={{ textIndent: '36.0pt', lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Attorneys</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 72.0pt' }}>We are not, and will not be, your employer, and no agency relationship is formed. Remote Legal will not be involved in any dispute that may arise between you and a client who hired you through Remote Legal for any issue arising that is not within the exclusive control of Remote Legal.</li>
              <li style={{ textIndent: '36.0pt', lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Users</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 72.0pt' }}>We do not give legal advice. You will not receive payment from Remote Legal, you will receive payment directly from consumers who purchase your service offering(s). Remote Legal will not be involved in any dispute that may arise between you and a client who hired you through Remote Legal for any issue arising that is not within the exclusive control of Remote Legal.</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Attorney <strong>Truthfulness</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Any information you cause to be presented on Remote Legal Services, or otherwise convey to any party in connection with Remote Legal Services, shall be true and accurate. This includes, but is not limited to, any communication about your experience, your education, your license(s) held, your bar association standing, the scope of your legal service offerings, and all other communication as it pertains to you as a lawyer and your services.</p>
            <ol start={5}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Fees</strong></li>
              <li style={{ textIndent: '36.0pt', lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Attorneys</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 72.0pt' }}>Remote Legal will never set an attorney’s fee for a legal service offering. The fee you advertise in connection will a legal service offering shall be the exact fee you charge the end consumer for the scope of the legal service offering as advertised on Remote Legal Services at the time the consumer orders that legal service offering. All fees, scope of work, and reasonably foreseeable additional fees and work, shall be transparent and clearly disclosed to the consumer before they choose to purchase your legal service offering. All fees charged for legal services shall be reasonable as that term is defined by all states in which you are licensed to practice law.You are obligated to complete the scope of work that is defined in the package, for the stated fee, at the time the end-user applies to purchase that package. However, reasonable alterations to the scope of work that both you and the end consumer agree to may be made, so-long as they are reflected in the Client Service Copy of the package accessible by both you and the end consumer.</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Users</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 72.0pt' }}><span style={{ background: 'white' }}> Fees for legal service offerings by attorneys using Remote Legal are set by the attorney. Remote Legal does not set the price that attorneys will charge.. Depending on the state you reside or are purchasing services from, part or all of your purchase may be subject to sales tax that could go to the attorney, Remote Legal, or both. By purchasing an attorney’s service offering you agree to pay the attorney’s legal fee to the attorney, and pay any applicable tax to the applicable party.</span></li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Intellectual property</strong></li>
              <li style={{ textIndent: '36.0pt', lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Attorneys</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 72.0pt' }}>By uploading, distributing, or otherwise making content available to others via Remote Legal, you are granting Remote Legal an unlimited, nonexclusive, transferable, nonrevocable license to use that content however Remote Legal chooses, with no restrictions. The content on Remote Legal is protected by copyright, trademark law, or other intellectual property law. You are not allowed to download, redistribute, or otherwise use any content on Remote Legal for any purpose, whether commercial or noncommercial, with the written permission of Remote Legal.</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Users</li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 72.0pt' }}><span style={{ background: 'white' }}> You shall not upload, distribute, or otherwise make available content on Remote Legal Services that you are not the exclusive intellectual property owner of. By uploading, distributing, or otherwise making content available to others via Remote Legal Services, you are granting Remote Legal an unlimited, non-exclusive, transferable, non-revocable license to use that content however Remote Legal chooses, with no restrictions. The content on Remote Legal and the source code used to create Remote Legal Services are protected by copyright, trademark law, or other intellectual property law. You are not allowed to download, redistribute, reproduce, display, sell, lease, transmit, create derivative works from, translate, modify, reverse-engineer, disassemble, or decompile any content on Remote Legal for any purpose, whether commercial or noncommercial, without the written permission of Remote Legal.</span></li>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Information and warranty disclaimer</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Much of the content on Remote Legal is created by its users. While we may periodically discover patently false or misleading information and remove it, we do not check every piece of information on Remote Legal for accuracy, currency, or completeness. REMOTE LEGAL MAKES NO WARRANTIES, EITHER EXPRESS OR IMPLIED, ABOUT THE CONTENT ON ITS SITE OR THE SERVICES OF ITS ATTORNEY USERS. REMOTE LEGAL DISCLAIMS ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PATICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>
            <ol start={8}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Limitation of liability</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>REMOTE LEGAL AND ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS SHALL NOT BE LIABLE, WHETHER UNDER CONTRACT, TORT, OR OTHER LEGAL THEORY, FOR ANY LOSS OR DAMAGE THAT: (I) WAS NOT CAUSED BY REMOTE LEGAL’S BREACH OF THIS AGREEMENT; (II) RESULTS FROM YOUR ACCESS OR INABILITY TO ACCESS REMOTE LEGAL OR ANY OF ITS SERVICES; (III) RESULTS FROM ANY UNAUTHORIZED ACCESS OR OTHER USE OF REMOTE LEGAL; OR (IV) IS THE RESULT OF ANY CONDUCT OR ACT BY A THIRD PARTY, INCLUDING BUT NOT LIMITED TO ATTORNEY USERS OF REMOTE LEGAL.</p>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>TO THE EXTENT PERMITTED BY APPLICABLE LAW, REMOTE LEGAL, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, OR OTHER DAMAGE OR LOSS TO ANY PERSON OR ENTITY FOR AN AMOUNT THAT EXCEEDS WHAT SAID PERSON OR ENTITY PAID TO REMOTE LEGAL IN THE PRECEDING TWELVE (12) MONTHS PRIOR TO A CLAIM BEING MADE.</p>
            <ol start={9}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Attorney <strong>Accuracy of user information</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>By using Remote Legal, you agree to provide Remote Legal, as well as any customer you interact with, with accurate and truthful information, including but not limited to your name, address, billing and payment information, contact information, location, and scope of services.</p>
            <ol start={11}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong> Agreement with Attorney</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>By purchasing a package from an attorney on Remote Legal you are agreeing to the terms of the package, including but not limited to, price and scope of work. However, each legal matter is unique and it is possible that the attorney will have to modify the scope of work, price, or other term of your purchased package. By using Remote Legal you are agreeing to the terms reflected in your package at the time of use. If the package is modified, you consent to the modification by continued use of Remote Legal without sending written objection to the modification to the attorney.</p>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>&nbsp;</p>
            <ol start={10}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>No use for illegal activity</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>You agree to not use Remote Legal, any of its services, or any of it’s the services offered by Remote Legal’s attorney users, in any way that would commit, or attempt, aid, abet, or conspire to commit, any act or omission that is illegal in any relevant or applicable jurisdiction, either federal, state, or local.</p>
            <ol start={12}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Indemnification</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>You agree that you will indemnify, hold harmless, and otherwise defend Remote Legal, its directors, officers, employees, and agents from and against any claim, threat, damage, cost, demand, liability, or expense, including but not limited to attorneys’ fees, that arise from or are related to your use of Remote Legal or its services.</p>
            <ol start={13}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>No Guarantee of Payment</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Remote Legal never handles the money an attorney is paid by a consumer who purchases a service offering. Accordingly, Remote Legal cannot, and does not, guarantee payment to the attorney by the consumer for any service.</p>
            <ol start={14}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Applicable Law</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>This agreement shall be applied and interpreted according to the laws of the State of Maryland.<span style={{ background: 'white' }}> By using Remote Legal you consent to personal jurisdiction and exclusive venue in the State of Maryland.</span></p>
            <ol start={15}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong> Dispute Resolution</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>If you have any dispute, controversy, or claim relating to, connected with, or arising from Remote Legal Services or this Agreement, that is categorized under any area of the law, including but not limited to, contract and tort, you shall send Remote Legal an email at emmyklint@remote.legal. Remote Legal will have ninety (90) days starting from the date we receive the email to work with you informally to try to reach an agreement. If, at the end of that ninety (90) day period we have not reached an agreement, the issue shall proceed to binding arbitration under Alternative Dispute Resolution. If an issue proceeds to arbitration, you agree that it shall be conducted by three (3) arbitrators</p>
            <ol start={15}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Modification and termination</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>Remote Legal reserves the right to modify the terms of this Agreement at any time without prior notice to you. Remote Legal will always post the most recent version of this agreement on its website. By using Remote Legal or any of its services after a new version of this agreement has been posted on the Remote Legal website you agree to be bound by any new or modified term. Remote Legal also has the right, in its sole discretion, to terminate this agreement in its entirety, or any of its terms, at any time without notice to you. Remote Legal may also block your access to its site or any of its services at any time without notice to you.</p>
            <ol start={16}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Waiver, severability, and assignment</strong></li>
            </ol>
            <p style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}>No right or duty of you created in this agreement may be assigned to any other person or entity. If any term, condition, or provision of this agreement is found unlawful or unenforceable, the remaining terms, conditions, and provisions shall remain in full effect. Remote Legal’s failure or inability to enforce any provision in this agreement or right created herein shall not constitute a waiver of its ability to enforce or right.</p>
            <ol start={17}>
              <li style={{ lineHeight: '17.15pt', background: 'white', margin: '0cm 0cm 12.0pt 0cm' }}><strong>Entire agreement</strong></li>
            </ol>
            <p style={{ margin: '0cm', marginBottom: '.0001pt', lineHeight: '17.15pt', background: 'white' }}>The terms, provisions, and conditions within this agreement constitute the entire agreement between you and Remote Legal. This agreement supersedes, replaces, or otherwise nullifies any prior representation or agreement between you and Remote Legal, whether written or oral, that conflicts with or contradicts any term, provision, or condition of this agreement. This agreement creates no third party beneficiary rights.</p>
            <p style={{ textAlign: 'right' }}>&nbsp;</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    const {
      classes,
    } = this.props;

    const {
      gender,
      userType,
      // userRegion,
    } = this.utilities;

    return (
      <div className={classes.formWrap} id="register-white-box">
        <PapperBlock whiteBg title="Create New Account" desc="" paperStyle={registerFormStyle.maxHeightProp}>
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
              <a href="#" className={classes.link} onClick={this.handleOpenDialog}>Terms &amp; Condition</a>
            </div>
            <Button
              disabled={!this.state.termsAgree}
              variant="contained"
              color="primary"
              type="submit"
              style={registerFormStyle.registerButton}
              onClick={() => this.submitForm()}>
              Continue
            </Button>
          </div>
        </PapperBlock>
        {this.termsDialog()}
      </div>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  createUser: createUserRequested,
  push,
  updateUser,
  getUserByIdRequest,
};

const RegisterFormConnected = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

export default withStyles(styles)(Radium(RegisterFormConnected));
