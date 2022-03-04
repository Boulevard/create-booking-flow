import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'
import Color from 'config/colors.json'
import Font from 'config/fonts.json'

export const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    height: '70px',
                    borderBottom: `1px solid #0000000a`,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                },
                colorPrimary: {
                    backgroundColor: '#FFFFFF',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: '3px',
                },
                barColorPrimary: {
                    backgroundColor: Color.primary.main,
                },
                colorPrimary: {
                    backgroundColor: '#FFFFFF',
                },
            },
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'filled',
                size: 'small',
                margin: 'none',
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '16px',
                    fontFamily: Font.body_family,
                    left: -12,
                    transform: 'translate(12px, 40px) scale(1)',
                    transformOrigin: 'bottom left',
                    '&.Mui-focused': {
                        transform: 'translate(12px, 18px) scale(0.75)',
                        color: 'rgba(0, 0, 0, 0.6)',
                    },
                    position: 'relative',
                    whiteSpace: 'normal',
                    paddingRight: '6px',
                },
                shrink: {
                    transform: 'translate(12px, 18px) scale(0.75)',
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginLeft: 0,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: '2px',
                    fontSize: 16,
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#33343C !important',
                        borderWidth: '1px !important',
                    },
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                size: 'small',
                variant: 'filled',
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    whiteSpace: 'normal',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                        {
                            borderColor: Color.custom.lightGray,
                        },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                            borderColor: '#33343C',
                            borderWidth: '1px',
                        },
                },
            },
            defaultProps: {
                variant: 'filled',
                fullWidth: true,
                size: 'small',
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    minHeight: '48px',
                    ':after': {
                        borderBottomColor: Color.primary.main,
                    },
                },
                input: {
                    paddingLeft: 0,
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box',
                    height: '48px',
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #ffffff inset',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '140px',
                    height: '38px',
                    fontFamily: Font.body_family,
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    fontSize: '16px',
                    boxShadow: 'none',
                    borderRadius: '4px',
                },
                outlinedPrimary: {
                    borderColor: Color.primary.main,
                    color: Color.primary.main,
                    '&:hover': {
                        border: `1px solid ${Color.primary.main}`,
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: Color.primary.dark,
                        border: `none`,
                        color: Color.primary.contrastText,
                        boxShadow: 'none',
                    },
                    '&.Mui-disabled': {
                        color: '#C3C7CF',
                        backgroundColor: '#EEF2F7',
                    },
                },
                textSecondary: {
                    backgroundColor: Color.secondary.main,
                    border: `2px solid #FFFFFF`,
                    borderColor: Color.primary.main,
                    color: Color.primary.main,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: Color.secondary.main,
                        border: `2px solid ${Color.primary.main}`,
                        borderColor: Color.primary.dark,
                        color: Color.primary.main,
                        boxShadow: 'none',
                    },
                },
            },
        },
    },

    typography: {
        fontFamily: Font.body_family,
        fontSize: 16,
        h1: {
            fontFamily: Font.headings_family,
            color: 'rgba(0, 0, 0, 0.9)',
            fontSize: '32px',
            fontWeight: 500,
        },
        h2: {
            fontFamily: Font.headings_family,
            color: 'rgba(0, 0, 0, 0.9)',
            fontSize: '20px',
            fontWeight: 500,
        },
        h3: {
            fontFamily: Font.body_family,
            color: '#33343C',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        h4: {
            fontFamily: Font.body_family,
            color: '#33343C',
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: 2,
        },
        h5: { fontFamily: Font.body_family },
        h6: {
            fontFamily: Font.body_family,
            fontSize: '20px',
        },
        subtitle1: {
            fontFamily: Font.body_family,
            color: Color.primary.main,
            fontSize: 16,
            textTransform: 'uppercase',
        },
        subtitle2: {
            fontFamily: Font.body_family,
            color: Color.primary.main,
            fontSize: 14,
            fontWeight: 'bold',
        },
        body1: {
            fontFamily: Font.body_family,
            color: '#33343C',
            fontSize: '14px',
        },
        body2: {
            fontFamily: Font.body_family,
            color: '#6E717D',
            fontSize: '14px',
        },
        button: {
            textTransform: 'none',
        },
    },
    palette: {
        ...Color,
    },
    shape: {
        borderRadius: 0,
    },
})

export const ThemeProvider: React.FC = ({ children }) => {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
