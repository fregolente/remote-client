import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
// Import icon
import Icon from '@material-ui/core/Icon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// Menu Object
import MenuContent from '~/constants/sideMenu';
import styles from './../styles';

function sortByKey(array, key) {
  return array.sort((a, b) => {
    const x = a[key]; const y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

class MainMenu extends React.Component {

  handleClick() {
    this.props.toggleDrawerOpen();
    this.props.loadTransition(false);
  }

  getMenus(menuArray) {
    const {
      classes,
    } = this.props;

    menuArray.map((item, index) => {
      if (item.child) return null;
      return (
        <ListItem
          key={index.toString()}
          button
          exact
          className={classes.nested}
          activeClassName={classes.active}
          component={NavLink}
          to={item.link}
          onClick={() => this.handleClick()}>
          {item.icon &&
            <ListItemIcon>
              <Icon className={classes.icon}>{item.icon}</Icon>
            </ListItemIcon>
          }
          <ListItemText classes={{ primary: classes.primary }} inset primary={item.name} />
        </ListItem>
      );
    })
  };

  render() {
    return (
      <div>
        {this.getMenus(MenuContent)}
      </div>
    );
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default withStyles(styles)(MainMenuMapped);
