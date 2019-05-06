import bgSVG from './background.svg'

export default {
  '@global': {
    '.fade-exit': {
      opacity: 1,
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms',
    },
  },
  root: {
    // minHeight: '100vh',
    height: '100vh',
    overflow: 'scroll',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: '2rem',
    backgroundColor: '#cccccc',
    backgroundImage: `url(${bgSVG})`,
  },
  container: {
    width: '84%',
    maxWidth: '800px',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#1e8feb',
    '& h1': {
      fontSize: '2.5rem',
      margin: '1rem 0',
    },
    '& a': {
      color: 'currentColor',
      fontSize: '1.5rem',
    },
  },
  palettes: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridColumnGap: '25px',
    marginTop: '1rem',
  },
}
