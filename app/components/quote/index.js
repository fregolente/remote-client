import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import styles from './styles';


class Quote extends React.Component {
  render() {
    const {
      align,
      content,
      footnote,
      classes
    } = this.props;

    return (
      <div className={classNames(classes.quoteWrap, align === 'right' ? classes.quoteRight : classes.quoteLeft)}>
        <Typography variant="subheading" className={classes.quoteBody} gutterBottom>
          {content}
        </Typography>
        <Typography variant="caption">
          {footnote}
        </Typography>
      </div>
    );
  }
}

Quote.propTypes = {
  align: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  footnote: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Quote);
