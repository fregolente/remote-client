import React from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'ba-utils/brand';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { PapperBlock } from './../../../components';

const menuItems = [
  {
    key: 'error_page',
    name: 'Error Page',
    link: '/app/pages/error'
  },
  {
    key: 'maintenance',
    name: 'Maintenance',
    link: '/maintenance'
  },
  {
    key: 'login',
    name: 'Login',
    link: '/login'
  },
  {
    key: 'register',
    name: 'Register',
    link: '/register'
  },
  {
    key: 'reset',
    name: 'Reset Password',
    link: '/reset-password'
  },
  {
    key: 'lock',
    name: 'Lock Screen',
    link: '/lock-screen'
  },
  {
    key: 'blank',
    name: 'Blank Page',
    link: '/app/pages/blank-page'
  },
];

const styles = {
  link: {
    display: 'block',
    textTransform: 'capitalize'
  }
};

function sortByKey(array, key) {
  return array.sort((a, b) => {
    const x = a[key]; const y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

class Parent extends React.Component {
  render() {
    const title = brand.name;
    const description = brand.desc;
    const { classes } = this.props;
    const getMenus = menuArray => menuArray.map((item, index) => (
      <Button
        key={index.toString()}
        color="primary"
        component={Link}
        className={classes.link}
        to={item.link}
      >
        {item.name}
      </Button>
    ));
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Built-in-Pages" desc="This Starter Project has included Error Page, Lock Screen, Login, Register, etc">
          {getMenus(sortByKey(menuItems, 'key'))}
        </PapperBlock>
      </div>
    );
  }
}

Parent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Parent);
