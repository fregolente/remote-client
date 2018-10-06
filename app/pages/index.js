import Radium from 'radium';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';


// Styles
import styles from './styles';

// Routes
import RemoteLegalRoutes from './routes';

class Container extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  shouldComponentUpdate(nextProps) {
  }

  render() {
    return (<RemoteLegalRoutes />);
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Container)));
