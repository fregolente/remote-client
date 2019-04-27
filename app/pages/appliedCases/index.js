import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

import {
  Button,
  Grid,
} from '@material-ui/core';

// Actions
import { getAppliedCases } from '~/state/lawyers/actions';

// Selectors
import { getAppliedCasesSelector } from '~/state/lawyers/selectors';

// Components
import PageHelmet from '~/components/pageHelmet';
import CaseCard from '~/components/caseCard';

// Constants
import * as ROUTES from '~/constants/routes';

import * as styles from './styles';

class AppliedCases extends Component {
  componentDidMount() {
    this.props.getAppliedCases();
  }

  goToExplorer = () => {
    this.props.push(ROUTES.EXPLORER);
  }

  showCasesCards = () => {
    const { appliedCasesData } = this.props;
    const { appliedCases } = appliedCasesData;

    if (appliedCases.length === 0) {
      return <p>Apply to a case to show here. <Button onClick={this.goToExplorer}>Go to Explorer page</Button></p>;
    }

    const isInExplorerPage = true;
    const casesObj = appliedCases.map(c => (<CaseCard
      isInExplorerPage={isInExplorerPage}
      columns={12}
      userCase={c}
      key={`caseCard---${generate()}`}
      caseStyle={styles.caseCard} />));
    return casesObj;
  }

  render() {
    const { appliedCasesData } = this.props;
    const { appliedCases, appliedCasesError, appliedCasesLoading } = appliedCasesData;

    const isLoading = appliedCasesLoading === true && !appliedCases.length;
    const hasError = appliedCasesLoading === false && appliedCasesError;
    const errorMessage = <p>{`An error occured: ${appliedCasesError}`}</p>;
    const shouldRenderCases = !isLoading && !hasError;

    return (
      <Grid container style={styles.mainContainer}>
        <PageHelmet title="My Profile" />
        <Grid item xs={12}>
          <h1>My Applied cases</h1>
          <hr />
        </Grid>
        <Grid item xs={12}>
          {isLoading && <p>Loading cases</p>}
          {hasError && errorMessage}
        </Grid>
        <Grid container spacing={8}>
          {shouldRenderCases && this.showCasesCards()}
        </Grid>
      </Grid>
    );
  }
}

AppliedCases.propTypes = {
  appliedCasesData: PropTypes.shape({
    appliedCases: PropTypes.array,
    appliedCasesError: PropTypes.string,
    appliedCasesLoading: PropTypes.bool,
  }).isRequired,
  getAppliedCases: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  push,
  getAppliedCases,
};

const mapStateToProps = state => ({
  appliedCasesData: getAppliedCasesSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Radium(AppliedCases));
