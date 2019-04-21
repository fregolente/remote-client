const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    '&$noMargin': {
      margin: 0,
    },
  }),
  title: {
    color: 'rgb(99, 99, 99)',
    lineHeight: 1.2,
    marginBottom: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
    position: 'relative',
    textTransform: 'capitalize',
    fontSize: 30,
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 30,
      borderBottom: '7px solid #6993b6',
    },
  },
  description: {
    maxWidth: 960,
    fontSize: 16,
  },
  content: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.background.default,
  },
  whiteBg: {
    backgroundColor: 'transparent',
    margin: 0,
  },
  noMargin: {},
  colorMode: {
    backgroundColor: theme.palette.secondary.main,
    '& $title': {
      color: theme.palette.grey[100],
      '&:after': {
        borderBottom: `5px solid ${theme.palette.primary.light}`
      }
    },
    '& $description': {
      color: theme.palette.grey[100],
    }
  },
  overflowX: {
    width: '100%',
    overflowX: 'auto',
  }
});

export default styles;
