import { Box, TextField, Button, FormHelperText, InputAdornment } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { login, send2FACode, verify2FACode, type ApiError } from '../../../api/auth';
import PersonIcon from '../../../assets/icons/UserOutlined.svg';
import LockIcon from '../../../assets/icons/LockOutlined.svg';
import { Snackbar, Alert } from '@mui/material';

type Step = 'login' | '2fa';

interface AuthFormProps {
    step: Step;
    setStep: (step: Step) => void;
    email?: string;
    setEmail?: (email: string) => void;
    password?: string;
    setPassword?: (password: string) => void;
}

export const AuthForm = ({
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
}: AuthFormProps) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [isCodeInvalid, setIsCodeInvalid] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (step === '2fa' && timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer]);

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        setLoading(true);
        try {
            await login({ email, password });
            await send2FACode(email!);
            setStep('2fa');
            setTimer(60);
            setCode(['', '', '', '', '', '']);
        } catch (err: unknown) {
            const apiErr = err as ApiError;
            setError(apiErr?.message || 'Server unavailable');
        } finally {
            setLoading(false);
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) inputsRef.current[index + 1]?.focus();
        if (!value && index > 0) inputsRef.current[index - 1]?.focus();
        if (isCodeInvalid) {
            setIsCodeInvalid(false);
        }
    };

    const handle2FASubmit = async () => {
        const codeStr = code.join('');
        if (codeStr.length !== 6 || !/^\d+$/.test(codeStr)) {
            setError('Enter a valid 6-digit code');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await verify2FACode(email!, codeStr);
            setSnackbarMessage('2FA successful!');
            setSnackbarOpen(true);
        } catch (err: unknown) {
            const apiErr = err as ApiError;
            setIsCodeInvalid(true);
            setError(apiErr?.message || 'Server unavailable');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setTimer(60);
        setCode(['', '', '', '', '', '']);
        setError(null);
        setLoading(true);

        try {
            await send2FACode(email!);
        } catch (err: unknown) {
            const apiErr = err as ApiError;
            setError(apiErr?.message || 'Failed to resend code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component='form'
            onSubmit={step === 'login' ? handleLoginSubmit : (e) => e.preventDefault()}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity='success'
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {step === 'login' ? (
                <>
                    <TextField
                        fullWidth
                        placeholder='Email'
                        variant='outlined'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail?.(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <img src={PersonIcon} alt='person' />
                                </InputAdornment>
                            ),
                        }}
                        error={!!error && error.toLowerCase().includes('email')}
                    />
                    <TextField
                        fullWidth
                        placeholder='Password'
                        variant='outlined'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword?.(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <img src={LockIcon} alt='lock' />
                                </InputAdornment>
                            ),
                        }}
                        error={!!error && error.toLowerCase().includes('password')}
                    />
                    {error && <FormHelperText error>{error}</FormHelperText>}
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        size='large'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Please wait...' : 'Log in'}
                    </Button>
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        {code.map((digit, index) => (
                            <TextField
                                key={index}
                                inputRef={(el) => (inputsRef.current[index] = el)}
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                variant='outlined'
                                sx={{
                                    width: 52,
                                    '& .MuiOutlinedInput-root': {
                                        height: 60,
                                        '& input': {
                                            textAlign: 'center',
                                            padding: 0,
                                            fontSize: 20,
                                        },
                                    },
                                }}
                                inputProps={{ maxLength: 1 }}
                            />
                        ))}
                    </Box>
                    {error && <FormHelperText error>{error}</FormHelperText>}

                    {timer > 0 ? (
                        code.every((c) => c) && (
                            <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                size='large'
                                onClick={handle2FASubmit}
                                disabled={isCodeInvalid || loading}
                            >
                                Continue
                            </Button>
                        )
                    ) : (
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            size='large'
                            onClick={handleResend}
                            disabled={loading}
                        >
                            Get New
                        </Button>
                    )}
                </>
            )}
        </Box>
    );
};
