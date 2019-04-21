import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { generate } from 'shortid';

const MarginComponent = (props) => {
  const {
    margin,
    centerClass,
    children,
    uniqueId,
  } = props;

  const center = 12 - (margin * 2);
  const containerId = uniqueId || generate();

  return (
    <Grid container id={`margin-component-${containerId}`}>
      <Grid item xs={margin} />
      <Grid item xs={center} className={centerClass}>
        {children}
      </Grid>
      <Grid item xs={margin} />
    </Grid>
  );
};

MarginComponent.defaultProps = {
  margin: 1,
  uniqueId: '',
  centerClass: {},
};

MarginComponent.propTypes = {
  margin: PropTypes.number,
  children: PropTypes.node.isRequired,
  uniqueId: PropTypes.string,
  centerClass: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
};

export default MarginComponent;
