import { Box, Paper } from '@mui/material';

import { AuthStepper } from '../components/AuthStepper/AuthStepper';

export const LoginPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    width: 440,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <AuthStepper />
            </Paper>
        </Box>
    );
};
