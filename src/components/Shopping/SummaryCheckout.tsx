import { Box, Button, Tab, Tabs, Typography } from "@mui/material";

const SummaryCheckout = () => {
    const summaryStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        gap: '25px',
        bgcolor: 'secondary.main',
        padding: '45px 25px',
        borderRadius: '10px'
    };

    return (
        <Box sx={{...summaryStyle }}>
            <Typography variant="h4">SUMMARY</Typography>
            <Box component={"div"} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>ITEM COUNT</Typography>
                <Typography>4</Typography>
            </Box>
            <Box component={"div"} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>TOTAL PRICE</Typography>
                <Typography>450$</Typography>
            </Box>
            <Button 
                size="large"
                sx={{ 
                    bgcolor: 'primary.main', 
                    color: '#fff',
                    marginTop: 2, 
                    "&:hover": {
                        bgcolor: 'primary.main', 
                        opacity: 0.8
                    } 
                }} 
            >
                CHECKOUT
            </Button>
        </Box>
    );
};

export default SummaryCheckout;