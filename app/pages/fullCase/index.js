
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isNil, isEmpty, anyPass, not, equals } from 'ramda';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { generate } from 'shortid';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link,
  InputAdornment,
  TextField,
  Typography,
  MenuItem,
} from '@material-ui/core';

// Actions
import { editUserCase, getAppliedLawyers } from '~/state/cases/actions';

// Components
import PageHelmet from '~/components/pageHelmet';

// Constants
import * as ROUTES from '~/constants/routes';

// Selectors
import { getSelectedCase, getAppliedLawyersData } from '~/state/cases/selectors';

// Utilities
import { getFromLocalStorage } from '~/utilities/localStorage';
import { getUserInitials } from '~/utilities/chatHelper';
import { getEditableCaseFromForm } from '~/utilities/case';
import { getFormattedDate } from '~/utilities/dateTime';


import * as styles from './style';

const LAWYERS_APPLIED = [{
  appliedDate: '03/05/2019 15:00',
  first: 'Rodney',
  last: 'Dawson',
  description: 'I\'m a awesome animal lawyer that wants bring simple solutions to big problem! You can trust me!',
}, {
  appliedDate: '03/06/2019 15:00',
  first: 'Charles',
  last: 'Darwin',
  description: 'I\'m a awesome animal lawyer that wants bring simple solutions to big problem! You can trust me!',
}];

const isNilOrEmpty = anyPass([isNil, isEmpty]);

class FullCase extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.utilities = getFromLocalStorage('utilities');

    const {
      title,
      description,
      priceType,
      practiceArea,
      region,
      suggestedPrice,
    } = this.props.fullCase;

    this.state = {
      caseTitle: title,
      caseDescription: description,
      caseRegion: region.value,
      casePracticeArea: practiceArea.value,
      casePriceType: priceType.value,
      casePriceAmount: suggestedPrice,
      regionOptions: this.utilities.userRegion,
      practiceAreaOptions: this.utilities.practiceArea,
      priceTypeOptions: this.utilities.priceType,
      inputVariant: 'outlined',
      titleLimiter: 50,
      descriptionLimiter: 250,
      submitted: false,
      isEditing: false,
      isEditingCase: false,
      oldCase: this.props.fullCase,
    };
  }

  componentDidMount() {
    const {
      _id: id,
    } = this.props.fullCase;
    this.props.getAppliedLawyers(id);
  }

  componentWillReceiveProps(nextProps) {
    if (not(equals(this.props.fullCase, nextProps.fullCase))) {
      this.setState({
        oldCase: nextProps.fullCase,
        isEditing: !this.state.isEditing,
      });
    }
  }

  getTopActionButtons = () => {
    const { isEditing, isEditingCase } = this.state;
    const backButtonText = isEditing ? 'Cancel and Back' : 'Back';
    const editButtonText = isEditing ? 'Cancel' : 'Edit';
    const saveButtonText = isEditingCase ? 'Editing...' : 'Save changes';
    const actionButtons = [
      <Button
        key={`top-action-button-toggle-edit---${generate()}`}
        variant="contained"
        color="primary"
        onClick={() => this.toggleEditMode()}
        disabled={isEditingCase}
        style={styles.actionButton}>
        {editButtonText}
      </Button>,
      <Button
        key={`top-action-button-back---${generate()}`}
        variant="contained"
        onClick={() => this.props.push(ROUTES.MY_CASES)}
        disabled={isEditingCase}
        color="secondary"
        style={styles.actionButton}>
        {backButtonText}
      </Button>,
    ];

    if (isEditing) {
      const saveButton = (
        <Button
          key={`top-action-button-save-case---${generate()}`}
          variant="contained"
          color="secondary"
          onClick={this.editCase}
          disabled={isEditingCase}
          style={styles.actionButton}>
          {saveButtonText}
        </Button>
      );
      actionButtons.push(saveButton);
    }

    return actionButtons;
  }

  getAppliedLawyerList = () => {
    const {
      appliedLawyers,
      loadingLawyers,
      appliedLawyersError,
    } = this.props.appliedLawyerData;

    const sectionTitle = 'Lawyers that applied to this case';
    const noAppliesMessage = 'No lawyers applied to this case yet.';

    const showError = loadingLawyers === false && appliedLawyersError;
    const showTable = loadingLawyers === false && appliedLawyers.length;
    const showNoAppliesMessage = !showError && !showTable;

    return (
      <div>
        <hr style={styles.pageBreak} />
        <h4>{sectionTitle} {showTable && `(${appliedLawyers.length})`}</h4>
        {loadingLawyers && <p>Loading lawyers table</p>}
        {showTable && this.appliedLawyersTable(appliedLawyers)}
        {showError && <p>{appliedLawyersError}</p>}
        {showNoAppliesMessage && <p>{noAppliesMessage}</p>}
      </div>
    );
  }

  appliedLawyersTable = (appliedLawyers) => {
    if (appliedLawyers.length === 0) {
      return (<span>No one applied to this case yet</span>);
    }

    const getLawyerFullName = (lawyer) => {
      const { first, last } = lawyer;
      return `${first} ${last}`;
    };

    const getLabelFromArray = (utilitiesArray) => {
      const reducer = (accumulator, currentValue) => `${accumulator}, ${currentValue}`;

      if (utilitiesArray.length === 1) {
        return utilitiesArray[0].label;
      }

      return utilitiesArray.reduce(reducer);
    };

    const graduationDateFormat = 'MM/DD/YYYY';

    const lawyerCards = appliedLawyers.map((l) => {
      const subtitle = `Graduated at ${l.institution} in ${getFormattedDate(l.graduationDate, graduationDateFormat)}`;
      return (
        <Grid item xs={4} key={generate()}>
          <Card style={styles.lawyerCard}>
            <CardHeader
              avatar={<Avatar aria-label="Lawyer initials">{getUserInitials(l.user)}</Avatar>}
              title={getLawyerFullName(l.user)}
              subheader={subtitle} />
            <CardContent>
              <Typography variant="body1">{l.biography}</Typography>
              <a href={l.linkedinURL} target="_blank" rel="noopener noreferrer">Linkedin profile</a>
              <Typography variant="overline" gutterBottom>Region: {getLabelFromArray(l.lawyerRegion)}</Typography>
              <Typography variant="overline" gutterBottom>
                Practice Area: {getLabelFromArray(l.practiceAreaData)}
              </Typography>
              <Typography variant="overline" gutterBottom>{l.user.phone}</Typography>
              <Typography variant="overline" gutterBottom>{l.user.email}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={() => this.startAChatWithALawyer(l.userId)}>Start a Chat</Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });

    return (
      <Grid container>
        {lawyerCards}
      </Grid>
    );
  }

  startAChatWithALawyer = (lawyer) => {
    // TODO: create a chat
    // TODO: redirect to chat page
    console.log('startAChatWithALawyer', lawyer);
  }

  toggleEditMode = () => {
    const {
      title,
      description,
      priceType,
      practiceArea,
      region,
      suggestedPrice,
    } = this.state.oldCase;

    this.setState({
      isEditing: !this.state.isEditing,
      caseTitle: title,
      caseDescription: description,
      caseRegion: region.value,
      casePracticeArea: practiceArea.value,
      casePriceType: priceType.value,
      casePriceAmount: suggestedPrice,
    });
  }

  createSelectOptions = (optionsArray) => {
    return optionsArray.map(option => (
      <MenuItem key={option.id} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  }

  hasErrorInField = (fieldValue) => {
    const { submitted } = this.state;

    if (submitted === false) {
      return false;
    }


    if (isNilOrEmpty(fieldValue)) {
      return true;
    }

    return false;
  }

  handleSelectChange = stateName => (event) => {
    const stateValue = event.target.value;
    this.setState({ [stateName]: stateValue });
  }

  handleInputChange = (event) => {
    if (event) {
      const { id: name, value } = event.target;
      this.setState({ [name]: value });
    }
  }

  editCase = () => {
    const {
      _id: id,
    } = this.props.fullCase;
    const {
      caseTitle,
      caseDescription,
      caseRegion,
      casePracticeArea,
      casePriceType,
      casePriceAmount,
    } = this.state;

    const hasError = (
      isNilOrEmpty(caseTitle) ||
      isNilOrEmpty(caseDescription) ||
      isNilOrEmpty(caseRegion) ||
      isNilOrEmpty(casePracticeArea) ||
      isNilOrEmpty(casePriceType) ||
      isNilOrEmpty(casePriceAmount)
    );

    if (hasError) {
      this.setState({
        submitted: true,
        hasError: true,
      });
      return;
    }

    this.setState({
      submitted: true,
      hasError: false,
    });

    const editCase = getEditableCaseFromForm({
      id,
      title: caseTitle,
      description: caseDescription,
      region: caseRegion,
      practiceArea: casePracticeArea,
      priceType: casePriceType,
      suggestedPrice: casePriceAmount,
    }, this.utilities);

    this.props.editUserCase(editCase);
  }

  showHelperTexts = () => {
    // TODO: create for editing case
    return null;
  }

  render() {
    const {
      hasError,
      titleLimiter,
      descriptionLimiter,
      regionOptions,
      practiceAreaOptions,
      priceTypeOptions,
      isEditing,
    } = this.state;

    const labelGridSize = 2;
    const inputGridSize = 12 - labelGridSize;
    const sideBySideGridSize = Math.round((inputGridSize - labelGridSize) / 2);

    const titleHelperText = `Simple and clear title (${titleLimiter} characters limit)`;
    const descriptionHelperText = `Describe what you need help with (${descriptionLimiter} characters limit)`;

    const amountAdorment = <InputAdornment position="start">US$</InputAdornment>;
    const isReadOnly = !isEditing;


    return (
      <Grid container style={styles.mainContainer}>
        <PageHelmet title="Case" />
        <Grid item xs={9}>
          <h1>My Case</h1>
          {this.showHelperTexts()}
          {hasError && (<p style={styles.errorText}>Fill all fields to create a new case.</p>)}
        </Grid>

        <Grid item xs={3} style={styles.topActionButtons}>
          {this.getTopActionButtons()}
        </Grid>

        <Grid item xs={12} style={styles.contentContainer}>
          <Card style={styles.cardContainer}>
            <Grid container>
              <Grid item xs={labelGridSize}>
                <p style={styles.formLabel}>Title</p>
              </Grid>
              <Grid item xs={inputGridSize}>
                <TextField
                  required
                  fullWidth
                  id="caseTitle"
                  label="Title"
                  placeholder="Simple case description"
                  margin="normal"
                  error={this.hasErrorInField(this.state.caseTitle)}
                  value={this.state.caseTitle}
                  onChange={this.handleInputChange}
                  variant={this.state.inputVariant}
                  helperText={titleHelperText}
                  InputProps={{
                    maxLength: titleLimiter,
                    readOnly: isReadOnly,
                  }}
                  style={styles.textField}
                  InputLabelProps={{
                    shrink: true,
                  }} />
              </Grid>

              <Grid item xs={labelGridSize}>
                <p style={styles.formLabel}>Description</p>
              </Grid>
              <Grid item xs={inputGridSize}>
                <TextField
                  required
                  multiline
                  rows="4"
                  rowsMax="8"
                  id="caseDescription"
                  error={this.hasErrorInField(this.state.caseDescription)}
                  value={this.state.caseDescription}
                  onChange={this.handleInputChange}
                  label="Description"
                  style={styles.textField}
                  placeholder="Full case description"
                  helperText={descriptionHelperText}
                  fullWidth
                  margin="normal"
                  variant={this.state.inputVariant}
                  InputProps={{ maxLength: descriptionLimiter, readOnly: isReadOnly }}
                  InputLabelProps={{
                    shrink: true,
                  }} />
              </Grid>

              <Grid item xs={labelGridSize}>
                <p style={styles.formLabel}>Charge by</p>
              </Grid>
              <Grid item xs={sideBySideGridSize}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Price Type"
                  id="casePriceType"
                  error={this.hasErrorInField(this.state.casePriceType)}
                  value={this.state.casePriceType}
                  onChange={this.handleSelectChange('casePriceType')}
                  variant={this.state.inputVariant}
                  style={styles.textField}
                  InputProps={{
                    readOnly: isReadOnly,
                  }} >
                  {this.createSelectOptions(priceTypeOptions)}
                </TextField>
              </Grid>

              <Grid item xs={1}>
                <p style={styles.formLabel}>Amount</p>
              </Grid>
              <Grid item xs={sideBySideGridSize + 1}>
                <TextField
                  required
                  fullWidth
                  id="casePriceAmount"
                  label="Amount"
                  placeholder="How much you are willing to pay"
                  margin="normal"
                  error={this.hasErrorInField(this.state.casePriceAmount)}
                  value={this.state.casePriceAmount}
                  onChange={this.handleInputChange}
                  variant={this.state.inputVariant}
                  helperText="Choose a fee that applies to your case"
                  style={styles.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: amountAdorment,
                    readOnly: isReadOnly,
                  }} />
              </Grid>

              <Grid item xs={labelGridSize}>
                <p style={styles.formLabel}>Region</p>
              </Grid>
              <Grid item xs={inputGridSize}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Region"
                  id="caseRegion"
                  helperText="Region the case happens"
                  error={this.hasErrorInField(this.state.caseRegion)}
                  value={this.state.caseRegion}
                  onChange={this.handleSelectChange('caseRegion')}
                  variant={this.state.inputVariant}
                  style={styles.textField}
                  InputProps={{
                    readOnly: isReadOnly,
                  }}>
                  {this.createSelectOptions(regionOptions)}
                </TextField>
              </Grid>

              <Grid item xs={labelGridSize}>
                <p style={styles.formLabel}>Practice Area</p>
              </Grid>
              <Grid item xs={inputGridSize}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Practice Area"
                  id="casePracticeArea"
                  helperText="Practice Area related to the case"
                  error={this.hasErrorInField(this.state.casePracticeArea)}
                  value={this.state.casePracticeArea}
                  onChange={this.handleSelectChange('casePracticeArea')}
                  variant={this.state.inputVariant}
                  style={styles.textField}
                  InputProps={{
                    readOnly: isReadOnly,
                  }}>
                  {this.createSelectOptions(practiceAreaOptions)}
                </TextField>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} style={styles.contentContainer}>
          {this.getAppliedLawyerList()}
        </Grid>
      </Grid>
    );
  }
}

FullCase.defaultProps = {
};

FullCase.propTypes = {
  push: PropTypes.func.isRequired,
  editUserCase: PropTypes.func.isRequired,
  getAppliedLawyers: PropTypes.func.isRequired,
  fullCase: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  appliedLawyerData: PropTypes.shape({
    appliedLawyers: PropTypes.array,
    loadingLawyers: PropTypes.bool,
    appliedLawyersError: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = {
  push,
  editUserCase,
  getAppliedLawyers,
};

const mapStateToProps = state => ({
  user: state.user.currentUser,
  fullCase: getSelectedCase(state),
  appliedLawyerData: getAppliedLawyersData(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Radium(FullCase));
