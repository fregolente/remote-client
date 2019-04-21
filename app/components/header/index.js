import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Constants
import * as routes from '~/constants/routes';

import styles from './styles';

class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      auth: true,
      anchorEl: null,
    };
  }

  goTo = (route) => {
    const { push } = this.props;
    switch (route) {
      case 'profile':
        push(routes.PROFILE_PAGE);
        break;
      case 'logout':
        // TODO: do logout action
        push(routes.LOGIN);
        break;
      default:
        null;
    }

    this.handleClose();
  }

  handleChange = (event) => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      classes,
      handleDrawerOpen,
      firstName,
      lastName,
    } = this.props;

    const loggedInUser = `${firstName} ${lastName}`;

    return (
      <div className={classes.root}>
        <AppBar color="secondary" position="static" style={{ backgroundColor: '#80a7c5', minHeight: '112px' }}>
          <Toolbar style={{ minHeight: '112px' }}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => handleDrawerOpen()}>
              <MenuIcon />
            </IconButton>
            <span className={classes.brand} />
            <div style={{ display: 'flex' }}>
              <AccountCircle style={{ marginRight: '5px' }} />
              {loggedInUser}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  firstName: state.user.currentUser.first,
  lastName: state.user.currentUser.last,
});

const mapDispatchToProps = {
  push,
};

const HeaderMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default withRouter(withStyles(styles)(HeaderMapped));