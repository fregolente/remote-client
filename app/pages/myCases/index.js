/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { not, isEmpty } from 'ramda';
import Radium from 'radium';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { generate } from 'shortid';
import { withStyles } from '@material-ui/core/styles';

import {
  Button,
  Grid,
  OutlinedInput,
  Select,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
} from '@material-ui/core';

// Constants
import * as ROUTES from '~/constants/routes';

// Components
import PageHelmet from '~/components/pageHelmet';
import CaseCard from '~/components/caseCard';

// Actions
import { getUserCases, selectACase } from '~/state/cases/actions';

// Selectors
import { getMyCasesStatus } from '~/state/cases/selectors';

// Utilities
import { getFromLocalStorage } from '~/utilities/localStorage';

import
styles,
{
  caseCard,
  mainContainer,
  cardsContainer,
  headerStyle,
  textHeaderStyle,
  button,
  formFilter,
  formHeader,
} from './styles';

class MyCases extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    const utilities = getFromLocalStorage('utilities');

    this.state = {
      title: '',
      description: '',
      region: '',
      area: '',
      pType: '',
      labelWidth: 0,
      userRegion: utilities.userRegion,
      practiceArea: utilities.practiceArea,
      priceType: utilities.priceType,
    };
  }

  componentDidMount() {
    this.props.getUserCases();
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  onMoreClick = (userCase) => {
    this.props.selectACase(userCase);
    this.props.push(ROUTES.FULL_CASE_URL);
  }

  filterCases = () => {
    const {
      title,
      description,
      region,
      area,
      pType,
    } = this.state;

    const filters = {
      title: title === '' ? undefined : title,
      description: description === '' ? undefined : description,
      region: region === '' ? undefined : region,
      practiceArea: area === '' ? undefined : area,
      priceType: pType === '' ? undefined : pType,
    };

    this.props.getUserCases(filters);
  }

  clearFilters = () => {
    this.props.getUserCases();
    this.setState({
      title: '',
      description: '',
      region: '',
      area: '',
      pType: '',
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  showCasesCards = () => {
    const { cases } = this.props.myCasesStatus;
    const casesObj = cases.map(c => (<CaseCard
      isInExplorerPage={false}
      columns={12}
      userCase={c}
      key={`caseCard---${generate()}`}
      caseStyle={caseCard}
      fullCaseAction={this.onMoreClick} />));
    return casesObj;
  }

  selectOptionsCreator = (optionsArray) => {
    return optionsArray.map(option => (
      <MenuItem key={option.value} value={option.id}>
        {option.label}
      </MenuItem>));
  }

  goToCase = () => {
    this.props.push(ROUTES.CASE_URL);
  }

  render() {
    const { classes } = this.props;
    const { practiceArea, userRegion, priceType } = this.state;
    const { cases, loading, error } = this.props.myCasesStatus;

    const showCasesCards = cases;
    const showLoading = loading && isEmpty(error);
    const showError = loading === false && not(isEmpty(error));
    const showEmptyCases = loading === false && isEmpty(cases) && isEmpty(error);

    return (
      <Grid container style={mainContainer}>
        <PageHelmet title="My Profile" />
        <Grid item xs={12} style={headerStyle}>
          <h1 style={textHeaderStyle} >My cases</h1>
          <Button variant="outlined" onClick={this.goToCase} style={button}>Create new case</Button>
        </Grid>

        <Grid item xs={3} className={classes.filterContainer}>
          <form style={formFilter}>
            <h4 style={formHeader}>Filters</h4>
            <Grid container>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    value={this.state.title}
                    onChange={this.handleChange}
                    name="title"
                    id="title"
                    label="Search title"
                    margin="none"
                    variant="outlined"
                    InputLabelProps={{
                      classes: {
                        outlined: classes.outlined,
                      },
                    }}
                    InputProps={{
                      classes: {
                        input: classes.input,
                      },
                    }} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    value={this.state.description}
                    onChange={this.handleChange}
                    name="description"
                    id="description"
                    label="Description"
                    margin="none"
                    variant="outlined"
                    InputLabelProps={{
                      classes: {
                        outlined: classes.outlined,
                      },
                    }}
                    InputProps={{
                      classes: {
                        input: classes.input,
                      },
                    }} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    classes={{ outlined: classes.outlined }}
                    ref={ref => this.InputLabelRef = ref}
                    htmlFor="region">
                    Region
                  </InputLabel>
                  <Select
                    value={this.state.region}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
                        classes={{ input: classes.input }}
                        labelWidth={this.state.labelWidth}
                        name="region"
                        id="region" />
                    }>
                    {this.selectOptionsCreator(userRegion)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    classes={{ outlined: classes.outlined }}
                    ref={ref => this.InputLabelRef = ref}
                    htmlFor="area">
                    Practice Area
                  </InputLabel>
                  <Select
                    value={this.state.area}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
                        classes={{ input: classes.input }}
                        labelWidth={this.state.labelWidth}
                        name="area"
                        id="area" />
                    }>
                    {this.selectOptionsCreator(practiceArea)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    classes={{ outlined: classes.outlined }}
                    ref={ref => this.InputLabelRef = ref}
                    htmlFor="pType">
                    Price Type
                  </InputLabel>
                  <Select
                    value={this.state.pType}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
                        classes={{ input: classes.input }}
                        labelWidth={this.state.labelWidth}
                        name="pType"
                        id="pType" />
                    }>
                    {this.selectOptionsCreator(priceType)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} className={classes.buttonSearch} onClick={this.clearFilters}>
                <Button color="default">Clear</Button>
              </Grid>
              <Grid item xs={6} className={classes.buttonSearch} onClick={this.filterCases}>
                <Button variant="contained" color="primary">Search</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={9} style={cardsContainer}>
          {showCasesCards && this.showCasesCards()}
          {showLoading && (<p>Loading your cases...</p>)}
          {showError && (<p>An error occured</p>)}
          {showEmptyCases && (<p>Create a case to get started!</p>)}
        </Grid>
      </Grid >
    );
  }
}

MyCases.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  push: PropTypes.func.isRequired,
  getUserCases: PropTypes.func.isRequired,
  selectACase: PropTypes.func.isRequired,
  myCasesStatus: PropTypes.shape({
    cases: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = {
  push,
  getUserCases,
  selectACase,
};

const mapStateToProps = state => ({
  myCasesStatus: getMyCasesStatus(state),
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Radium(MyCases)));