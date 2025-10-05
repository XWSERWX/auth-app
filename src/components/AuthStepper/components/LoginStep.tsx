import { Box, Typography } from '@mui/material';
import { AuthForm } from './AuthForm';

interface LoginStepProps {
    setStep: (step: 'login' | '2fa') => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
}

export const LoginStep = ({ setStep, email, setEmail, password, setPassword }: LoginStepProps) => (
    <Box>
        <Typography variant='h5' textAlign='center' mb={1}>
            Sign in to your account to continue
        </Typography>
        <AuthForm
            step='login'
            setStep={setStep}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
        />
    </Box>
);
