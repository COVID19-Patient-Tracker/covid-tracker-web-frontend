import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

/**
 * Font Package
 * @type {{Roboto: string, Montserrat: string, Abel: string}}
 */
export const theme_fonts = {
    Roboto: 'Roboto',
    Montserrat: 'Montserrat',
    Abel: 'Abel'
}

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#A9CDEF',
        },
        secondary: {
            main: '#64E3A7', 
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#F7F7F7',
        },
        color1: {
            main: '#000000',
        },
        color2: {
            main: '#FFADAD'
        },
        color3: {
            main: "#E0C2FF"
        }
    },
    typography: {
        fontFamily: [theme_fonts.Montserrat, 'sans-serif'].join(', '),
    },

});

export default theme;