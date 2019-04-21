import React, { Component } from 'react';
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
import Divider from '@material-ui/core/Divider';

import MarginComponent from '~/components/marginComponent';

// Styles
import * as styles from './styles';

// Routes
import RemoteLegalRoutes from './routes';

class Container extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      isDrawerOpen: false,
    };
  }

  componentWillMount() {
  }

  handleDrawerOpen = () => {
    this.setState({ isDrawerOpen: true });
  }

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false });
  }

  render() {
    const { classes } = this.props;
    // TODO: get this dynamically
    const { location } = this.props;

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


Container.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Radium(Container)));