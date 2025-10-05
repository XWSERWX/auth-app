import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthForm } from './AuthForm';

interface TwoFAStepProps {
    setStep: (step: 'login' | '2fa') => void;
    email: string;
}

export const TwoFAStep = ({ setStep, email }: TwoFAStepProps) => (
    <Box>
        <IconButton
            onClick={() => setStep('login')}
            sx={{ position: 'absolute', top: 32, left: 32 }}
        >
            <ArrowBackIcon />
        </IconButton>
        <Typography variant='h5' textAlign='center' mb={1}>
            Two-Factor Authentication
        </Typography>
        <Typography variant='body1' textAlign='center' mb={3}>
            Enter the 6-digit code sent to your email
        </Typography>
        <AuthForm step='2fa' setStep={setStep} email={email} />
    </Box>
);
