export default {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  colors: {
    backgroundColor: 'white',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridAutoRows: '30px',
  },
  miniColor: {
    height: '100%',
    width: '100%',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    paddingTop: '0.5rem',
    color: 'black',
    fontSize: '1rem',
    position: 'relative',
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
  },
}
