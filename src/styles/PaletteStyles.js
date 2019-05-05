import mq from './mediaQueries'

export default {
  Palette: {
    minHeight: '100vh',
    // overflowX: 'scroll',
    // display: 'flex',
    // flexDirection: 'column',
  },
  Palette__colors: {
    minHeight: '90vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    // gridTemplateRows: 'repeat(4, 1fr)',
    gridAutoRows: 'minmax(120px, 1fr)',
    backgroundColor: 'lightgrey',
    [mq.down('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [mq.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  goBackBox: {
    position: 'relative',
    backgroundColor: 'black',
  },
  goBackBtn: {
    color: 'white',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    opacity: '1',
    textDecoration: 'none',
  },
}
