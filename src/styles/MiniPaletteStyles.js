export default {
  container: {
    width: '100%',
    maxWidth: '350px',
    paddingTop: '80%',
    position: 'relative',
    margin: '0 auto',
  },

  root: {
    height: '90%',
    maxHeight: '320px',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '4%',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover svg': {
      opacity: 1,
    },
  },
  deleteIcon: {
    color: 'white',
    backgroundColor: '#eb3d30',
    display: 'inline-block',
    position: 'absolute',
    right: '0',
    top: '0',
    boxSizing: 'content-box',
    padding: '7px',
    opacity: 0,
  },
  colors: {
    backgroundColor: 'lightgrey',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'grid',
    height: '80%',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
  },
  miniColor: {
    height: '100%',
    width: '100%',
  },
  title: {
    height: '20%',
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
