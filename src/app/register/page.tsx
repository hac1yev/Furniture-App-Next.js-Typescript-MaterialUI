import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RegisterForm from '@/components/Register/RegisterForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await getServerSession();

  if(session) {
    redirect("/");
  }

  return (
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4">
            Register
          </Typography>
          <RegisterForm />
        </Box>
      </Container>
  );
}