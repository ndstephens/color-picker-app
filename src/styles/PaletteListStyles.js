import bgSVG from './background.svg'

export default {
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
    gridGap: '25px',
  },
}
