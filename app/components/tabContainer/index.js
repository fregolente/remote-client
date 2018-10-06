import React from 'react';
import PropTypes from 'prop-types';

function TabContainer(props) {
  const {
    children,
    numberOfTabs,
  } = props

  const paddingTop = 8 * 3;

  return (
    <div style={{ paddingTop }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;
