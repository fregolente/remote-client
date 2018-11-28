import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

// list
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// icons
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Chat from '@material-ui/icons/Chat';
import Explore from '@material-ui/icons/Explore';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import Search from '@material-ui/icons/Search';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import * as ROUTES from '~/constants/routes';

import styles from './styles';

class AppDrawer extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  clickedOnListItem = (route) => {
    this.props.handleDrawerClose();
    this.props.push(route);
  }

  render() {
    const { classes, isDrawerOpen, handleDrawerClose } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        classes={{ paper: classes.drawerPaper }} >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={ROUTES.EXPLORER_TEXT} onClick={() => this.clickedOnListItem(ROUTES.EXPLORER)}>
            <ListItemIcon>
              <Explore />
            </ListItemIcon>
            <ListItemText primary={ROUTES.EXPLORER_TEXT} secondary={ROUTES.EXPLORER_SECONDARY_TEXT} />
          </ListItem>
          <ListItem button key={ROUTES.CHAT_TEXT} onClick={() => this.clickedOnListItem(ROUTES.CHAT)}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary={ROUTES.CHAT_TEXT} secondary={ROUTES.CHAT_SECONDARY_TEXT} />
          </ListItem>
          <ListItem button key={ROUTES.SEARCH_TEXT} onClick={() => this.clickedOnListItem(ROUTES.SEARCH)}>
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary={ROUTES.SEARCH_TEXT} />
          </ListItem>

        </List>
        <Divider />
        <List>
          <ListItem button key={ROUTES.PROFILE_PAGE_TEXT} onClick={() => this.clickedOnListItem(ROUTES.PROFILE_PAGE)}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={ROUTES.PROFILE_PAGE_TEXT} />
          </ListItem>
          <ListItem button key={ROUTES.LOGOUT_TEXT} onClick={() => this.clickedOnListItem(ROUTES.LOGIN)}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={ROUTES.LOGOUT_TEXT} />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  push,
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(AppDrawer));