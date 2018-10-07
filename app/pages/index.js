import Radium from 'radium';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Routes
import RemoteLegalRoutes from './routes';

class Container extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      transform: 0,
    };
  }

  render() {
    const {
      classes,
      isPageLoading,
      sidebarOpen,
    } = this.props;


    return (
      <div className={classes.appFrameInner}>
        <PageHeader toggleDrawerOpen={this.toggleDrawer} turnDarker={this.state.transform > 30 && darker} margin={sidebarOpen} />
        <Sidebar
          open={sidebarOpen}
          toggleDrawerOpen={this.toggleDrawer}
          loadTransition={this.loadTransition}
          turnDarker={this.state.transform > 30 && darker} />
        <main className={classNames(classes.content, !sidebarOpen && classes.contentPadding)} id="mainContent">
          <div className={classes.bgbar} />
          <section className={classes.mainWrap}>
            <BreadCrumb separator=" › " theme="light" location={this.props.history.location} />
            {isPageLoading && (<img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />)}
            <Fade
              in={!isPageLoading}
              mountOnEnter
              unmountOnExit
              {...(!isPageLoading ? { timeout: 700 } : {})}>
              <div className={isPageLoading ? classes.hideApp : ''}>
                <RemoteLegalRoutes />
              </div>
            </Fade>
          </section>
        </main>
      </div>);
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  isPageLoading: PropTypes.bool.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isPageLoading: state.uiActions.isPageLoading,
  sidebarOpen: state.uiActions.sidebarOpen,
});

const mapDispatchToProps = {
};

const ContainerConnected = connect(mapStateToProps, mapDispatchToProps)(Container);

export default withRouter(ContainerConnected);
