import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Loading from 'react-loading-bar';
// import jwt from 'jsonwebtoken';
// import { push } from 'react-router-redux';
// import { withRouter } from 'react-router';
import {
  withStyles,
} from '@material-ui/core/styles';

// Actions
import {
  changeThemeAction,
  setPageLoadingAction,
} from '~/state/uiActions/actions';


// Global CSS file
import '~/styles/components/vendors/react-loading-bar/index.css';

// MainContainer Style
import styles from './styles';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
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
    this.props.setIsPageLoading(true);
  }

  onProgressHide = () => {
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
      isPageLoading,
    } = this.props;


    return (
      <div id="main-container" className={classes.root}>
        <Loading
          show={isPageLoading}
          color="rgba(255,255,255,.9)"
          showSpinner={false} />
        {this.props.children}
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
  color: PropTypes.string.isRequired,
  isPageLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  color: state.uiActions.theme,
  isPageLoading: state.uiActions.isPageLoading,
});

const mapDispatchToProps = () => ({
  changeTheme: changeThemeAction,
  setIsPageLoading: setPageLoadingAction,
});

const MainContainerMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);

export default withStyles(styles)(MainContainerMapped);
