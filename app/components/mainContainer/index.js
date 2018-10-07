import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Loading from 'react-loading-bar';
// import jwt from 'jsonwebtoken';
// import { push } from 'react-router-redux';
// import { withRouter } from 'react-router';
import {
  withTheme, withStyles,
  createMuiTheme, MuiThemeProvider
} from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

// Components
import PageHeader from '~/components/pageHeader';
import Sidebar from '~/components/sidebar';
import BreadCrumb from '~/components/breadcrumb';


// Actions
import {
  changeThemeAction,
  setPageLoadingAction,
} from '~/state/uiActions/actions';

// react-loading-bar CSS file
import '~/styles/components/vendors/react-loading-bar/index.css';

import { } from '~/styles/normalize.scss';
import { } from '~/styles/layout/_base.scss'; // eslint-disable-line

// Utilities
import ThemePallete from '~/utilities/themePallet';

// MainContainer Style
import styles from './styles';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      showLoading: true,
      transform: 0,
    }
  }

  componentWillMount = () => {
    this.onProgressShow();
  }

  componentDidMount = () => {
    const { history } = this.props;

    this.playProgress();
    this.unlisten = history.listen(() => {
      console.log('Show')
      this.playProgress();
    });
  }

  componentWillUnmount() {
    this.unlisten();
    this.onProgressShow();
  }

  toggleDrawer() {
    console.log('Drawer toggled');
    // TODO: call uiAction
  }

  loadTransition() {
    console.log('Load transition')
    // TODO: call uiAction
  }

  handleScroll = (event) => {
    const scoll = event.target.scrollTop;
    this.setState({
      transform: scoll
    });
  }

  onProgressShow = () => {
    this.setState({ showLoading: true });
    this.props.setIsPageLoading(true);
  }

  onProgressHide = () => {
    this.setState({ showLoading: false });
    this.props.setIsPageLoading(false);
  }

  playProgress = () => {
    this.onProgressShow();
    setTimeout(() => {
      this.onProgressHide();
    }, 500);
  }

  render() {
    const {
      classes,
    } = this.props;

    const defaultTheme = 'greyTheme';
    const theme = createMuiTheme(ThemePallete[defaultTheme]);

    return (
      <div id="main-container" className={classes.root}>
        <Loading
          show={this.state.showLoading}
          color="red"
          showSpinner={true} />
        <MuiThemeProvider theme={theme}>
          {this.props.children}
        </MuiThemeProvider>
      </div>
    );
  }
}

MainContainer.defaultProps = {
};

MainContainer.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  changeTheme: changeThemeAction,
  setIsPageLoading: setPageLoadingAction,
};

const MainContainerMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);

export default withTheme()(withStyles(styles)(MainContainerMapped));
