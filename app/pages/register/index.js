import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';


import RegisterPage from '~/components/registerPage';

import styles, { background } from './styles';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appFrameOuter}>
        <main className={classes.outerContent} style={background} id="mainContent">
          <Hidden mdUp>
            <div className={classes.brand} />
          </Hidden>
          <RegisterPage />
        </main>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
};

export default withRouter((withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Register))));
