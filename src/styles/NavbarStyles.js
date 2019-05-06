export default {
  Navbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '@media (max-width: 810px)': {
      flexWrap: 'wrap',
    },
    '@media (max-width: 550px)': {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },

  logo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '22px',
    backgroundColor: '#eceff1',
    fontFamily: 'Roboto',
    height: '6vh',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: '#000',
    },
    '@media (max-width: 550px)': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },

  sliderContainer: {
    height: '6vh',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 805px)': {
      flexBasis: '100%',
      order: 1,
      justifyContent: 'center',
    },
  },

  slider: {
    width: '250px',
    margin: '0 10px',
    display: 'inline-block',
    '& .rc-slider-track': {
      backgroundColor: 'transparent',
    },
    '& .rc-slider-rail': {
      height: '8px',
    },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus,.rc-slider-handle:hover': {
      backgroundColor: 'green',
      outline: 'none',
      border: '2px solid green',
      boxShadow: 'none',
      width: '13px',
      height: '13px',
      marginLeft: '-7px',
      marginTop: '-3px',
    },
    '@media (max-width: 370px)': {
      width: '220px',
    },
  },

  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
    '@media (max-width: 550px)': {
      paddingTop: '0.5rem',
      margin: '0 auto',
    },
  },
}
