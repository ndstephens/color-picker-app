import mq from './mediaQueries'

export default {
  root: {
    minHeight: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridAutoRows: 'minmax(120px, 20%)',
    backgroundColor: 'lightgrey',
    [mq.down('lg')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [mq.down('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [mq.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
}
