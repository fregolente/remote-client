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
import { getFavoriteCases } from '~/state/lawyers/actions';

// Selectors
import { getFavoriteCasesSelector } from '~/state/lawyers/selectors';

// Components
import PageHelmet from '~/components/pageHelmet';
import CaseCard from '~/components/caseCard';

// Constants
import * as ROUTES from '~/constants/routes';

import * as styles from './styles';

class FavoriteCases extends Component {
  componentDidMount() {
    this.props.getFavoriteCases();
  }

  goToExplorer = () => {
    this.props.push(ROUTES.EXPLORER);
  }

  showCasesCards = () => {
    const { favoriteCasesData } = this.props;
    const { favoriteCases } = favoriteCasesData;

    if (favoriteCases.length === 0) {
      return <p>Favorite some cases to show here. <Button onClick={this.goToExplorer}>Go to Explorer page</Button></p>;
    }

    const isInExplorerPage = true;
    const casesObj = favoriteCases.map(c => (<CaseCard
      isInExplorerPage={isInExplorerPage}
      columns={12}
      userCase={c}
      key={`caseCard---${generate()}`}
      caseStyle={styles.caseCard} />));
    return casesObj;
  }

  render() {
    const { favoriteCasesData } = this.props;
    const { favoriteCasesLoading, favoriteCasesError, favoriteCases } = favoriteCasesData;

    const isLoading = favoriteCasesLoading === true && !favoriteCases.length;
    const hasError = favoriteCasesLoading === false && favoriteCasesError;
    const errorMessage = <p>{`An error occured: ${favoriteCasesError}`}</p>;
    const shouldRenderCases = !isLoading && !hasError;

    return (
      <Grid container style={styles.mainContainer}>
        <PageHelmet title="My Profile" />
        <Grid item xs={12}>
          <h1>My Favorited cases</h1>
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

FavoriteCases.propTypes = {
  favoriteCasesData: PropTypes.shape({
    favoriteCases: PropTypes.array,
    favoriteCasesError: PropTypes.string,
    favoriteCasesLoading: PropTypes.bool,
  }).isRequired,
  getFavoriteCases: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  push,
  getFavoriteCases,
};

const mapStateToProps = state => ({
  favoriteCasesData: getFavoriteCasesSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Radium(FavoriteCases));
