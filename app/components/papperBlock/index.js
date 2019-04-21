import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from './style';

function PaperSheet(props) {
  const {
    classes,
    title,
    desc,
    children,
    whiteBg,
    noMargin,
    colorMode,
    overflowX,
    paperStyle,
  } = props;
  return (
    <div>
      <Paper
        style={paperStyle}
        className={classNames(classes.root, noMargin && classes.noMargin, colorMode && classes.colorMode)}
        elevation={4}>
        <h2 className={classes.title}>{title}</h2>
        <Typography className={classes.description}>
          {desc}
        </Typography>
        <section className={classNames(classes.content, whiteBg && classes.whiteBg, overflowX && classes.overflowX)}>
          {children}
        </section>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  whiteBg: PropTypes.bool,
  colorMode: PropTypes.bool,
  noMargin: PropTypes.bool,
  overflowX: PropTypes.bool,
  paperStyle: PropTypes.object,
};

PaperSheet.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: false,
  overflowX: false
};

export default withStyles(styles)(Radium(PaperSheet));
