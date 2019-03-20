import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { not, isEmpty } from 'ramda';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

import {
  Button,
  Grid,
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

import * as styles from './styles';

class MyCases extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.props.getUserCases();
  }

  onMoreClick = (userCase) => {
    this.props.selectACase(userCase);
    this.props.push(ROUTES.FULL_CASE_URL);
  }

  showCasesCards = () => {
    const { cases } = this.props.myCasesStatus;
    const casesObj = cases.map(c => (<CaseCard
      isInExplorerPage={false}
      columns={12}
      userCase={c}
      key={`caseCard---${generate()}`}
      caseStyle={styles.caseCard}
      fullCaseAction={this.onMoreClick} />));
    return casesObj;
  }

  goToCase = () => {
    this.props.push(ROUTES.CASE_URL);
  }

  render() {
    const { cases, loading, error } = this.props.myCasesStatus;

    if (!cases) {
      return (<p>deu ruim</p>);
    }

    const showCasesCards = cases;
    const showLoading = loading && isEmpty(error);
    const showError = loading === false && not(isEmpty(error));

    return (
      <Grid container style={styles.mainContainer}>
        <PageHelmet title="My Profile" />
        <Grid item xs={10}>
          <h1>My cases</h1>
        </Grid>

        <Grid item xs={2}>
          <Button variant="outlined" onClick={this.goToCase}>Create new case</Button>
        </Grid>

        <Grid item xs={2}>
          <h3>Filters</h3>
        </Grid>

        <Grid item xs={10}>
          {showCasesCards && this.showCasesCards()}
          {showLoading && (<p>Loading your cases...</p>)}
          {showError && (<p>An error occured</p>)}
        </Grid>
      </Grid>
    );
  }
}

MyCases.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Radium(MyCases));