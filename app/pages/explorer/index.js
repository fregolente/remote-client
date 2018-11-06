import React, { Component } from 'react';
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

import styles, { casesContainer } from './styles';

class Explorer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: '',
      labelWidth: 0,
    };
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
        <Grid item xs={3} key={c.id}>
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

  render() {
    const { classes } = this.props;

    return (
      <div>
        <PageHelmet title="Explore" />
        <Grid container spacing={24}>
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={12} style={casesContainer}>
            <Grid container spacing={8}>
              {this.showCasesCards()}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Explorer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Radium(Explorer));
