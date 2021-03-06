import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

// list
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// icons
import Chat from '@material-ui/icons/Chat';
import Explore from '@material-ui/icons/Explore';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Assignment from '@material-ui/icons/Assignment';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// Selectors
import { isRegularUser, isLawyer } from '~/state/currentUser/selectors';

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
    const {
      classes,
      isDrawerOpen,
      handleDrawerClose,
    } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        classes={{ paper: classes.drawerPaper }} >
        <List>
          <ListItem button key={ROUTES.PROFILE_PAGE_TEXT} onClick={() => this.clickedOnListItem(ROUTES.PROFILE_PAGE)}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={ROUTES.PROFILE_PAGE_TEXT} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {this.props.isLawyer
            && (
              <ListItem button key={ROUTES.EXPLORER_TEXT} onClick={() => this.clickedOnListItem(ROUTES.EXPLORER)}>
                <ListItemIcon>
                  <Explore />
                </ListItemIcon>
                <ListItemText primary={ROUTES.EXPLORER_TEXT} secondary={ROUTES.EXPLORER_SECONDARY_TEXT} />
              </ListItem>
            )}
          <ListItem button key={ROUTES.CHAT_TEXT} onClick={() => this.clickedOnListItem(ROUTES.CHAT)}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary={ROUTES.CHAT_TEXT} secondary={ROUTES.CHAT_SECONDARY_TEXT} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {
            this.props.isRegularUser &&
            (
              <ListItem button key={ROUTES.CASE_URL} onClick={() => this.clickedOnListItem(ROUTES.CASE_URL)}>
                <ListItemIcon>
                  <LibraryAdd />
                </ListItemIcon>
                <ListItemText primary={ROUTES.CASE_TEXT} secondary={ROUTES.CASE_SECONDARY_TEXT} />
              </ListItem>
            )}
          {
            this.props.isRegularUser &&
            (
              <ListItem button key={ROUTES.MY_CASES} onClick={() => this.clickedOnListItem(ROUTES.MY_CASES)}>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary={ROUTES.MY_CASES_TEXT} secondary={ROUTES.MY_CASES_SECONDARY_TEXT} />
              </ListItem>
            )}
          {
            this.props.isLawyer &&
            (
              <ListItem
                button
                key={ROUTES.FAVORITE_CASE_URL}
                onClick={() => this.clickedOnListItem(ROUTES.FAVORITE_CASE_URL)}>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary={ROUTES.FAVORITE_CASE_TEXT} secondary={ROUTES.FAVORITE_CASE_SECONDARY_TEXT} />
              </ListItem>
            )}
          {
            this.props.isLawyer &&
            (
              <ListItem
                button
                key={ROUTES.APPLIED_CASE_URL}
                onClick={() => this.clickedOnListItem(ROUTES.APPLIED_CASE_URL)}>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary={ROUTES.APPLIED_CASE_TEXT} secondary={ROUTES.APPLIED_CASE_SECONDARY_TEXT} />
              </ListItem>
            )}
        </List>
        <Divider />
        <List>
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
  isLawyer: PropTypes.bool.isRequired,
  isRegularUser: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLawyer: isLawyer(state),
  isRegularUser: isRegularUser(state),
});

const mapDispatchToProps = {
  push,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppDrawer));