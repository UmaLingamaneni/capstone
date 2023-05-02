import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
import AuthLayout from '../../../layout/AuthLayout';
import Page from '../../../component/Page';
import RegisterForm from './RegisterForm';



// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    overflow: "hidden",
    height:"100vh",
    [theme.breakpoints.up('md')]: {
    display: 'flex'
}
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '73vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(11, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
    return (
        <RootStyle title="Register">
            <AuthLayout>
                Already have an account? &nbsp;
                <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
                    Login
                </Link>
            </AuthLayout>

            <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                    Hi, Welcome Back
                </Typography>
                <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=2000" alt="login" />
            </SectionStyle>

            <Container maxWidth="sm">
                <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                            Sign up
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                    </Stack>
                    {/* <AuthSocial /> */}

                    <RegisterForm />

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            mt: 3,
                            display: { sm: 'none' }
                        }}
                    >
                        Already have an account?&nbsp;
                        <Link variant="subtitle2" component={RouterLink} to="/login" underline="hover">
                            Login
                        </Link>
                    </Typography>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
}
