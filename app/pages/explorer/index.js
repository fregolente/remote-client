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

// Components
import PageHelmet from '~/components/pageHelmet';
import CaseCard from '~/components/caseCard';

// Selector
import { utilitiesSelector } from '~/state/utilities/selectors';

// Constants
import { ALL_LAWYER_CASES } from '~/constants/casesMock';

import styles, { casesContainer } from './styles';

class Explorer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: '',
      area: '',
      labelWidth: 0,
      userRegion: [],
      practiceArea: [],
      showHelp: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { utilities } = nextProps;
    if (utilities && utilities.userRegion) {
      const { userRegion, practiceArea } = nextProps.utilities;
      this.setState({ userRegion, practiceArea });
    }
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  showCasesCards = () => {
    const casesObj = ALL_LAWYER_CASES.map((c) => (<CaseCard isInExplorerPage={true} columns={4} userCase={c} key={`caseCard---${c.id}`}/>));
    return casesObj;
  }

  regionSelectOptions = (userRegions) => {
    const options = userRegions.map((region) =>
      (<MenuItem key={region.id} value={region.value}>
        {region.label}
      </MenuItem>))
    return options;
  }

  practiceAreaSelectOptions = (practiceAreas) => {
    const options = practiceAreas.map((area) =>
      (<MenuItem key={area.id} value={area.value}>
        {area.label}
      </MenuItem>))
    return options;
  }

  toggleHelp = () => {
    const { showHelp } = this.state;
    this.setState({ showHelp: !showHelp });
  }

  render() {
    const { classes } = this.props;
    const { practiceArea, userRegion } = this.state;

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
                Use this page to explore user created cases and apply to those you see fit. Use the left column to filter cases and search title text.
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
                    id="outlined-name"
                    label="Search title"
                    margin="normal"
                    variant="outlined"
                  />
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
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {this.regionSelectOptions(userRegion)}
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
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {this.practiceAreaSelectOptions(practiceArea)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} className={classes.buttonSearch}>
                <Button color="default">Clear</Button>
              </Grid>
              <Grid item xs={6} className={classes.buttonSearch}>
                <Button variant="contained" color="primary">Search</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={9} style={casesContainer}>
          <Grid container spacing={8}>
            {this.showCasesCards()}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

Explorer.propTypes = {
  classes: PropTypes.object.isRequired,
  utilities: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  utilities: utilitiesSelector(state),
});

const mapDispatchToProps = {
};

const ReduxedExplorer = connect(mapStateToProps, mapDispatchToProps)(Explorer)

export default withStyles(styles)(Radium(ReduxedExplorer));
