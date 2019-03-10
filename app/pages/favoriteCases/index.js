import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';

import {
  Grid,
} from '@material-ui/core';

// Constants
import { ALL_LAWYER_FAVORITE_CASES } from '~/constants/casesMock';

// Components
import PageHelmet from '~/components/pageHelmet';
import CaseCard from '~/components/caseCard';

import * as styles from './styles';

class FavoriteCases extends Component {
  showCasesCards = () => {
    const casesObj = ALL_LAWYER_FAVORITE_CASES.map((c) => (<CaseCard
      isInExplorerPage={true}
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
          <h1>My Favorite cases</h1>
        </Grid>

        {this.showCasesCards()}
      </Grid>
    );
  }
}

FavoriteCases.propTypes = {
  push: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  push,
};

export default connect(null, mapDispatchToProps)(Radium(FavoriteCases));
