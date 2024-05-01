"use client";

import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import '../../components/Contact/Contact.css';
import { useState } from 'react';
import Image from 'next/image';

const Contact = () => {
    const [fullName,setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [theme,setTheme] = useState('');
    const [message,setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {            
            const response = await fetch("/api/contact", {
                method: 'POST',
                body: JSON.stringify({
                    email, fullName, theme, message
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            console.log(data);
            
        } catch (error) {
            console.log(error);
        }

        setFullName('');
        setEmail('');
        setTheme('');
        setMessage('');
    };

    return (
        <Container
            component="div" 
            maxWidth={false} 
            sx={{ marginTop: 8, marginBottom: 5, width: "90%" }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography variant='h3'>CONTACT</Typography>
                        <TextField
                            margin="dense"
                            type="text"
                            fullWidth
                            label="Name Surname"
                            name="fullName"
                            onChange={(e) => setFullName(e.target.value)} 
                            value={fullName}
                        />
                        <TextField
                            margin="dense"
                            type="email"
                            fullWidth
                            label="Email Address"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                        />
                        <TextField
                            margin="dense"
                            type="text"
                            fullWidth
                            label="Theme"
                            name="theme"
                            onChange={(e) => setTheme(e.target.value)} 
                            value={theme}
                        />
                        <TextField
                            margin="dense"
                            fullWidth
                            label="Your Messsage"
                            name="message"
                            onChange={(e) => setMessage(e.target.value)} 
                            value={message}
                        />
                        <Button type='submit' variant='contained' sx={{ color: '#fff', width: '100%', marginTop: 2 }} size='large'>SEND</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6} sx={{ paddingX: 8 }}>
                    <Box sx={{ position: 'relative', height: '100%' }}>
                        <Image fill src={'/Contact_Img.png'} alt="furniture19" />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;