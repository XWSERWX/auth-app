import { Box } from '@mui/material';
import { useState } from 'react';
import { LoginStep } from './components/LoginStep';
import { TwoFAStep } from './components/TwoFAStep';
import Logo from '../../assets/Logo.svg';

type Step = 'login' | '2fa';

export const AuthStepper = () => {
    const [step, setStep] = useState<Step>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Box component='img' src={Logo} alt='Logo' sx={{ height: 'auto', my: 2.5 }} />
            <Box sx={{ width: '100%' }}>
                {step === 'login' && (
                    <LoginStep
                        setStep={setStep}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                )}
                {step === '2fa' && <TwoFAStep setStep={setStep} email={email} />}
            </Box>
        </>
    );
};
