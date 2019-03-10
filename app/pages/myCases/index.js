import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as R from 'ramda';
import Radium from 'radium';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';

// Constants
import { ALL_USER_CASES } from '~/constants/casesMock';
import * as ROUTES from '~/constants/routes';

// Components
import PageHelmet from '~/components/pageHelmet';
import CaseCard from '~/components/caseCard';

// Actions
import { getUserCases } from '~/state/cases/actions';

import casesAPI from '~/apis/cases';

import * as styles from './styles';

class MyCases extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    casesAPI.listUserCases();
    // this.props.getUserCases();
  }

  showCasesCards = () => {
    const casesObj = ALL_USER_CASES.map((c) => (<CaseCard
      isInExplorerPage={false}
      columns={10}
      userCase={c}
      key={`caseCard---${c.id}`}
      caseStyle={styles.caseCard} />));
    return casesObj;
  }

  render() {
    return (
      <Grid container style={styles.mainContainer}>
        <PageHelmet title="My Profile" />
        <Grid item xs={10}>
          <h1>My cases</h1>
        </Grid>

        <Grid item xs={2}>
          <Button variant="outlined" onClick={() => this.props.push(ROUTES.CASE_URL)}>Create new case</Button>
        </Grid>

        {this.showCasesCards()}
      </Grid>
    );
  }
}

MyCases.propTypes = {
  push: PropTypes.func.isRequired,
  getUserCases: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  push,
  getUserCases,
};

export default connect(null, mapDispatchToProps)(Radium(MyCases));