import blueGrey from '@material-ui/core/colors/blueGrey';

const styles = ({
  quoteWrap: {
    padding: '0 25',
    margin: 10,
    position: 'relative',
    '&:before': {
      color: blueGrey[100],
      fontSize: '4em',
      lineHeight: '.1em',
      marginRight: '.25em',
      verticalAlign: '-.4em'
    }
  },
  quoteLeft: {
    extend: 'quoteWrap',
    textAlign: 'left',
    borderLeft: '5px solid' + blueGrey[50],
    paddingLeft: 25,
    '&:before': {
      content: 'open-quote',
    }
  },
  quoteRight: {
    extend: 'quoteWrap',
    textAlign: 'right',
    borderRight: '5px solid' + blueGrey[50],
    paddingRight: 25,
    '&:before': {
      content: 'close-quote',
    }
  },
  quoteBody: {
    minHeight: 100,
    marginBottom: 20
  }
});

export default styles;
