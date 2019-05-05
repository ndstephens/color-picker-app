import chroma from 'chroma-js'

export default {
  root: {
    position: 'relative',
    cursor: 'pointer',
  },
  boxContent: {
    width: '100%',
    position: 'absolute',
    left: '0',
    top: '0',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    color: props =>
      chroma(props.color).luminance() >= 0.55 ? 'rgba(0, 0, 0, 0.65)' : 'white',
  },
  deleteIcon: {
    transform: 'scale(1)',
    '&:hover': {
      transform: 'scale(1.3)',
    },
    transition: 'transform 200ms',
  },
}
