import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';

// Utilities
import { getFromLocalStorage } from '~/utilities/localStorage';

// Actions
import { getExplorerCases } from '~/state/cases/actions';
import { favoriteACase, applyToACase } from '~/state/lawyers/actions';

// Components
import PageHelmet from '~/components/pageHelmet';
import CaseCard from '~/components/caseCard';

// Selector
import { utilitiesSelector } from '~/state/utilities/selectors';
import { getExplorerPageData } from '~/state/cases/selectors';

import styles, { casesContainer } from './styles';

const HELPER_TEXT = `Use this page to explore user created cases and apply to
those you see fit. Use the left column to filter cases and search title text.`;

class Explorer extends Component {
  constructor(props) {
    super(props);
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
      showHelp: false,
    };
  }

  componentDidMount() {
    this.props.getExplorerCases();
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
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

    this.props.getExplorerCases(filters);
  }

  clearFilters = () => {
    this.props.getExplorerCases();
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

  showCasesCards = (explorerCases) => {
    if (explorerCases.length === 0) {
      return <p>No cases to show.</p>;
    }

    const isInExplorerPage = true;
    const casesObj = explorerCases.map((c) => {
      const { _id: id } = c;
      return (<CaseCard
        caseApplyAction={this.props.applyToACase}
        caseFavoriteAction={this.props.favoriteACase}
        isInExplorerPage={isInExplorerPage}
        columns={4}
        userCase={c}
        key={`caseCard---${id}`} />);
    });
    return casesObj;
  }

  selectOptionsCreator = (optionsArray) => {
    return optionsArray.map(option => (
      <MenuItem key={option.value} value={option.id}>
        {option.label}
      </MenuItem>));
  }

  toggleHelp = () => {
    const { showHelp } = this.state;
    this.setState({ showHelp: !showHelp });
  }

  render() {
    const { classes, explorerPageData } = this.props;
    const { practiceArea, userRegion, priceType } = this.state;
    const { explorerCases, loadingExplorerCases, explorerCasesError } = explorerPageData;

    const isLoading = loadingExplorerCases === true && !explorerCases.length;
    const hasError = loadingExplorerCases === false && explorerCasesError;
    const errorMessage = <p>{`An error occured: ${explorerCasesError}`}</p>;
    const shouldRenderCases = !isLoading && !hasError;

    return (
      <Grid container>
        <PageHelmet title="Explore" />
        <Grid item xs={12} className={classes.explainText}>
          <Typography variant="h5" gutterBottom>
            Explore Cases <Button size="small" onClick={() => this.toggleHelp()} >help</Button>
          </Typography>
          {this.state.showHelp && (
            <div>
              <Typography variant="body2" gutterBottom>
                {HELPER_TEXT}
              </Typography>
              <Divider />
            </div>)}
        </Grid>
        <Grid item xs={2} className={classes.filterContainer}>
          <form>
            <h4>Filters</h4>
            <Grid container>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    value={this.state.title}
                    onChange={this.handleChange}
                    name="title"
                    id="title"
                    label="Search title"
                    margin="normal"
                    variant="outlined" />
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
                    margin="normal"
                    variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={ref => this.InputLabelRef = ref}
                    htmlFor="region">
                    Region
                  </InputLabel>
                  <Select
                    value={this.state.region}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
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
                    ref={ref => this.InputLabelRef = ref}
                    htmlFor="area">
                    Practice Area
                  </InputLabel>
                  <Select
                    value={this.state.area}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
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
                    ref={ref => this.InputLabelRef = ref}
                    htmlFor="pType">
                    Price Type
                  </InputLabel>
                  <Select
                    value={this.state.pType}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
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
        <Grid item xs={10} style={casesContainer}>
          <Grid container spacing={8}>
            {isLoading && <p>Loading Cases...</p>}
            {hasError && errorMessage}
            {shouldRenderCases && this.showCasesCards(explorerCases)}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Explorer.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  explorerPageData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  getExplorerCases: PropTypes.func.isRequired,
  favoriteACase: PropTypes.func.isRequired,
  applyToACase: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  utilities: utilitiesSelector(state),
  explorerPageData: getExplorerPageData(state),
});

const mapDispatchToProps = {
  getExplorerCases,
  favoriteACase,
  applyToACase,
};

const ReduxedExplorer = connect(mapStateToProps, mapDispatchToProps)(Explorer)

export default withStyles(styles)(Radium(ReduxedExplorer));
