"use client";

import { Box, Container, Typography } from "@mui/material";

const NotFoundPage = () => {
    return (
        <Container sx={{ width: '100%', height: '57vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '180px', fontFamily: 'Didot', fontWeight: '700', lineHeight: '129px' }}>404</Typography>
                <Typography sx={{ fontSize: '48px', fontFamily: 'Didot', fontWeight: '500', lineHeight: '42px', letterSpacing: '-1.5%' }}>PAGE NOT FOUND</Typography>
            </Box>
        </Container>
    );
};

export default NotFoundPage;