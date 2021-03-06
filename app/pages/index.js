import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { isNil, isEmpty } from 'ramda';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Components
import Header from '~/components/header';
import AppDrawer from '~/components/appDrawer';
import Breadcrumb from '~/components/breadcrumb';

import MarginComponent from '~/components/marginComponent';

import { currentUserId } from '~/state/currentUser/selectors';
// Styles
import * as styles from './styles';

// Routes
import RemoteLegalRoutes from './routes';

import * as ROUTES from '~/constants/routes';

class Container extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      isDrawerOpen: false,
    };
  }

  componentWillMount() {
    const { userId, location } = this.props;
    const { pathname } = location;

    if (pathname === '/') {
      this.props.push(ROUTES.LOGIN);
    }
  }

  handleDrawerOpen = () => {
    this.setState({ isDrawerOpen: true });
  }

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false });
  }

  render() {
    const { location, userId } = this.props;

    if (isNil(userId) || isEmpty(userId)) {
      return null;
    }

    return (
      <Grid container id="container" style={styles.container}>
        <Grid item xs={12}>
          <Header handleDrawerOpen={this.handleDrawerOpen} />
          <AppDrawer
            isDrawerOpen={this.state.isDrawerOpen}
            handleDrawerClose={this.handleDrawerClose} />
        </Grid>

        <Grid item xs={12} style={styles.breadcrumbContainer}>
          <MarginComponent margin={2} uniqueId="breadcrumb">
            <Breadcrumb theme="dark" separator=" › " location={location} />
          </MarginComponent>
        </Grid>

        <MarginComponent margin={2} uniqueId="remote-legal-routes">
          <RemoteLegalRoutes />
        </MarginComponent>


      </Grid>
    );
  }
}

Container.defaultProps = {
  userId: null,
};

Container.propTypes = {
  userId: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  push: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  userId: currentUserId(state),
});

const mapDispatchToProps = {
  push,
};

export default withRouter(withStyles(styles)(Radium(connect(mapStateToProps, mapDispatchToProps)(Container))));
