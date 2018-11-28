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

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Components
import PageHelmet from '~/components/pageHelmet';

// Selector
import { utilitiesSelector } from '~/state/utilities/selectors';

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
    const { classes } = this.props;
    const casesArray = [
      {
        id: 'uuuiiiiddddeeee',
        title: 'First case',
        description: 'First case description',
        suggestedPrice: '$60',
        priceType: {
          id: 'ppppttttiiiidddd',
          label: 'per hour'
        },
        _createdAt: '12/25/18 11:50 AM',
        status: {
          id: 'ssssttttiiiidddd',
          label: 'Open'
        },
        caseRegions: ['1', '2', '3'],
        caseAreas: ['1', '2', '3'],
      },
      {
        id: 'uuuiiiiddddffff',
        title: 'Second case',
        description: 'Second case description',
        suggestedPrice: '$60',
        priceType: {
          id: 'ppppttttiiiidddd',
          label: 'per hour'
        },
        _createdAt: '12/25/18 11:52 AM',
        status: {
          id: 'ssssttttiiiidddd',
          label: 'Open'
        },
        caseRegions: ['1', '2'],
        caseAreas: ['1', '3'],
      }
    ];

    const casesObj = casesArray.map((c) => {
      return (
        <Grid item xs={3} key={c.id} className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {c.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Created at {c._createdAt}
              </Typography>
              <Typography component="p">
                {c.description}
                <br />
                region | area
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button size="small">Apply</Button>
              <Button size="small">Favorite</Button>
              <Button size="small">Quick View</Button>
            </CardActions>
          </Card>
        </Grid>
      )
    });


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

  render() {
    const { classes } = this.props;
    const { practiceArea, userRegion } = this.state;

    return (
      <Grid container>
        <PageHelmet title="Explore" />
        <Grid item xs={12} className={classes.filterContainer}>
          <form>
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
          </form>
        </Grid>
        <Grid item xs={12} style={casesContainer}>
          <Grid container>
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
