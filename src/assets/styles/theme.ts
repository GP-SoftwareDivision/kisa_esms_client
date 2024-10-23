export const theme = {
  typography: {
    h1: {
      fontSize: '2rem',
      lineHeight: 1.375,
      fontWeight: 700,
      letterSpacing: '-0.03rem',
      marginBottom: '0.5em',
    },
    h2: {
      fontSize: '1.75rem',
      lineHeight: 1.4,
      fontWeight: 700,
      letterSpacing: '-0.02rem',
      marginBottom: '0.5em',
    },
    h3: {
      fontSize: '1.5rem',
      lineHeight: 1.45,
      fontWeight: 600,
      letterSpacing: '-0.01rem',
      marginBottom: '0.5em',
    },
    h4: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
      fontWeight: 600,
      letterSpacing: '-0.01rem',
      marginBottom: '0.5em',
    },
    body: {
      fontSize: '0.925rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.825rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    title: {
      fontSize: '1rem',
      lineHeight: 1.4,
      fontWeight: 700,
      letterSpacing: '0.01rem',
    },
    subtitle: {
      fontSize: '0.875rem',
      lineHeight: 1.45,
      fontWeight: 700,
      letterSpacing: '0rem',
    },
    caption1: {
      fontSize: '0.725rem',
      lineHeight: 1.4,
      fontWeight: 500,
    },
    caption2: {
      fontSize: '0.625rem',
      lineHeight: 1.35,
      fontWeight: 500,
    },
    buttonText: {
      fontSize: '1rem',
      lineHeight: 1.25,
      fontWeight: 600,
      letterSpacing: '0.03rem',
      textTransform: 'uppercase',
    },
    linkText: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 500,
      textDecoration: 'underline',
    },
    quote: {
      fontSize: '1.13rem',
      lineHeight: 1.6,
      fontWeight: 400,
      fontStyle: 'italic',
    },
    code: {
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: '0.88rem',
      lineHeight: 1.5,
    },
  },
  color: {
    white: '#FFFFFF',
    gray100: '#F5F5F5',
    gray200: '#E9EBED',
    gray300: '#DBDEE2',
    gray600: '#8E94A0',
    gray700: '#6F7785',
    gray800: '#404A5C',
    gray900: '#101C33',
    blue100: '#4f79a5',
  },
}

declare module '@emotion/react' {
  export interface Theme {
    typography: {
      h1: {
        fontSize: string
        lineHeight: number
        fontWeight: number
        letterSpacing: string
        marginBottom: string
      }
      h2: {
        fontSize: string
        lineHeight: number
        fontWeight: number
        letterSpacing: string
        marginBottom: string
      }
      h3: {
        fontSize: string
        lineHeight: number
        fontWeight: number
        letterSpacing: string
        marginBottom: string
      }
      h4: {
        fontSize: string
        lineHeight: number
        fontWeight: number
        letterSpacing: string
        marginBottom: string
      }
      body: {
        fontSize: string
        lineHeight: number
        fontWeight: number
      }
      body2: {
        fontSize: string
        lineHeight: number
        fontWeight: number
      }
      title: {
        fontSize: string
        lineHeight: number
        fontWeight: number
        letterSpacing: string
      }
      subtitle: {
        fontSize: string
        lineHeight: number
        fontWeight: number
        letterSpacing: string
      }
      caption1: {
        fontSize: string
        lineHeight: number
        fontWeight: number
      }
      caption2: {
        fontSize: string
        lineHeight: number
        fontWeight: number
      }
      buttonText: {
        fontSize: string
        lineHeight: number
        fontWeight: number
        letterSpacing: string
        textTransform: string
      }
      linkText: {
        fontSize: string
        lineHeight: number
        fontWeight: number
        textDecoration: string
      }
      quote: {
        fontSize: string
        lineHeight: number
        fontWeight: number
        fontStyle: string
      }
      code: {
        fontFamily: string
        fontSize: string
        lineHeight: number
      }
    }
    color: {
      white: string
      gray100: string
      gray200: string
      gray300: string
      gray600: string
      gray700: string
      gray800: string
      gray900: string
      blue100: string
    }
  }
}
