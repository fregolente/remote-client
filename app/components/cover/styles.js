const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cover: {
    '& $name, & $subheading': {
      color: theme.palette.primary.main,
    },
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    boxShadow: theme.shadows[7],
  },
  content: {
    height: '100%',
    width: '100%',
    padding: `20px ${theme.spacing.unit * 3}px 30px`
  },
  name: {
    color: theme.palette.primary.main,
  },
  avatar: {
    margin: '0 auto',
    width: 120,
    height: 120,
    border: '3px solid rgba(255, 255, 255, .5)'
  },
  opt: {
    position: 'absolute',
    top: 10,
    right: 10,
    '& button': {
      color: theme.palette.common.white,
    },
  },
  verified: {
    margin: theme.spacing.unit,
    top: 10,
    position: 'relative'
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

export default styles;
