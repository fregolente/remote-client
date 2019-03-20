import { push } from 'react-router-redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNil, isEmpty, anyPass, equals, not } from 'ramda';
import PropTypes from 'prop-types';
import Radium from 'radium';

import {
  Button,
  Card,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
} from '@material-ui/core';

// Actions
import { createCase } from '~/state/cases/actions';

// Utilities
import { getFromLocalStorage } from '~/utilities/localStorage';

// Selectors
import { createCaseStatus } from '~/state/cases/selectors';

// Components
import PageHelmet from '~/components/pageHelmet';

import * as ROUTES from '~/constants/routes';

import * as styles from './styles';

const isNilOrEmpty = anyPass([isNil, isEmpty]);

class Case extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.utilities = getFromLocalStorage('utilities');

    this.state = {
      caseTitle: '',
      caseDescription: '',
      caseRegion: '',
      casePracticeArea: '',
      casePriceType: '',
      casePriceAmount: '',
      regionOptions: this.utilities.userRegion,
      practiceAreaOptions: this.utilities.practiceArea,
      priceTypeOptions: this.utilities.priceType,
      inputVariant: 'outlined',
      titleLimiter: 50,
      descriptionLimiter: 250,
      submitted: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (not(equals(this.props.caseStatus, nextProps.caseStatus))) {
      const { createSuccess, creatingCase, error } = nextProps.caseStatus;

      if (createSuccess === true && creatingCase === false && isNilOrEmpty(error)) {
        this.props.push(ROUTES.MY_CASES);
      }
    }
  }

  createSelectOptions = (optionsArray) => {
    return optionsArray.map(option => (
      <MenuItem key={option.value} value={option.id}>
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

  createCase = () => {
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

    const { user } = this.props;
    const { _id: userId } = user;

    const newCase = {
      userId,
      title: caseTitle,
      description: caseDescription,
      region: caseRegion,
      practiceArea: casePracticeArea,
      priceType: casePriceType,
      suggestedPrice: casePriceAmount,
    };

    this.props.createCase(newCase);
  }

  showHelperTexts = () => {
    const { createSuccess, creatingCase, error } = this.props.caseStatus;

    if (createSuccess === false && creatingCase === false && !isNilOrEmpty(error)) {
      return (<p style={styles.errorText}>An error occured when creating your case.</p>);
    }

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
    } = this.state;

    const { creatingCase } = this.props.caseStatus;

    const labelGridSize = 2;
    const inputGridSize = 12 - labelGridSize;
    const sideBySideGridSize = Math.round((inputGridSize - labelGridSize) / 2);

    const titleHelperText = `Simple and clear title (${titleLimiter} characters limit)`;
    const descriptionHelperText = `Describe what you need help with (${descriptionLimiter} characters limit)`;
    const createButtonText = creatingCase ? 'Creating...' : 'Create';
    const amountAdorment = <InputAdornment position="start">US$</InputAdornment>;

    return (
      <Grid container style={styles.mainContainer}>
        <PageHelmet title="Case" />
        <Grid item xs={10}>
          <h1>Create Case</h1>
          {this.showHelperTexts()}
          {hasError && (<p style={styles.errorText}>Fill all fields to create a new case.</p>)}
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="outlined"
            onClick={() => this.createCase()}
            disabled={creatingCase}>
            {createButtonText}
          </Button>
        </Grid>

        <Grid item xs={11} style={styles.contentContainer}>
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
                  inputProps={{ maxLength: titleLimiter }}
                  style={{ margin: 8 }}
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
                  style={{ margin: 8 }}
                  placeholder="Full case description"
                  helperText={descriptionHelperText}
                  fullWidth
                  margin="normal"
                  variant={this.state.inputVariant}
                  inputProps={{ maxLength: descriptionLimiter }}
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
                  style={{ margin: 8 }}>
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
                  style={{ margin: 8 }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ startAdornment: amountAdorment }} />
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
                  style={{ margin: 8 }}>
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
                  style={{ margin: 8 }}>
                  {this.createSelectOptions(practiceAreaOptions)}
                </TextField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }
}


Case.propTypes = {
  push: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  createCase: PropTypes.func.isRequired,
  caseStatus: PropTypes.shape({
    error: PropTypes.string,
    creatingCase: PropTypes.bool,
    createSuccess: PropTypes.bool,
  }).isRequired,
};

const mapDispatchToProps = {
  push,
  createCase,
};

const mapStateToProps = state => ({
  user: state.user.currentUser,
  caseStatus: createCaseStatus(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Case));
