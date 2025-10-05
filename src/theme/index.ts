import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: { main: '#1677FF' },
        background: { default: '#F5F5F5' },
        error: { main: '#E53935' },
        text: { primary: '#1C1C1E', secondary: '#00000040' },
    },
    typography: {
        fontFamily: '"SF Pro Text", "Inter", "Roboto", sans-serif',
        h5: { fontWeight: 600 },
        body1: { fontWeight: 400 },
    },
    shape: { borderRadius: 6 },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                InputLabelProps: { shrink: false },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    height: 40,
                    borderRadius: 8,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D9D9D9',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1677FF',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #1677FF',
                        boxShadow: '0 0 0 2px #0591FF1A',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    display: 'none',
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    marginRight: 4,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 40,
                    textTransform: 'none',
                    borderRadius: 8,
                    fontWeight: 400,
                    boxShadow: '0 1px 0 1px #0591FF1A',

                    '&.Mui-disabled': {
                        color: '#00000040',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#D9D9D9',
                        backgroundColor: '#0000000A',
                    },
                },
            },
        },
    },
});
