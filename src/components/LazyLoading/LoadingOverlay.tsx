"use client";

import { Box, Typography } from '@mui/material';
import '../Products/Product.css';

const LoadingOverlay = ({ overlayText }: { overlayText: string }) => {
    return (
        <Box className="loading-overlay">
            <Box style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Box style={{height: '90px', display: 'flex', alignItems: 'center'}}>
                    <Box className="box" style={{ width: '25px', height: '25px' }}>
                        <Box className="loader-05"></Box>
                    </Box>
                </Box>    
                <Typography>{overlayText}</Typography>
            </Box>
        </Box>
    );
};

export default LoadingOverlay;