import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Loading from 'react-loading-bar';
// import jwt from 'jsonwebtoken';
// import { push } from 'react-router-redux';
import {
  withTheme, withStyles,
  createMuiTheme, MuiThemeProvider
} from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

// Utilities
import ThemePallete from '~/utilities/themePallet';

// Components


// Actions
import {
  changeThemeAction,
  setPageLoadingAction,
} from '~/state/uiActions/actions';

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
      this.playProgress();
    });
  }

  componentWillUnmount() {
    this.unlisten();
    this.onProgressShow();
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
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      ...ThemePallete[defaultTheme],
    });

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

export default withRouter(withTheme()(withStyles(styles)(MainContainerMapped)));
