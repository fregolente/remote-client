import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import brand from '~/utilities/brand';

import Logo from '../../../static/images/logo.svg';

import { getUtilitiesRequested } from '~/state/utilities/actions';

import LoginPage from '~/components/loginPage';

import { styles, background } from './styles';

class Dedicated extends React.Component {
  componentWillMount() {
    const callback = (utilities) => {
      // TODO
    }

    this.props.getUtilities(callback);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appFrameOuter}>
        <main className={classes.outerContent} style={background} id="mainContent">
          <Hidden mdUp>
            <div className={classes.brand}>
              <Logo />
              <h3>{brand.name}</h3>
            </div>
          </Hidden>
          <LoginPage />
        </main>
      </div >
    );
  }
}

Dedicated.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  getUtilities: getUtilitiesRequested,
};

const ReduxedDedicated = connect(mapStateToProps, mapDispatchToProps)(Dedicated)

export default withRouter(Radium((withStyles(styles)(ReduxedDedicated))));
