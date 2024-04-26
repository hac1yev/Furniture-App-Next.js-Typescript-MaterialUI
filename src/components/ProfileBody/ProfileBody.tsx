"use client"

import { Box, CssBaseline, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import './ProfileBody.css';
import PersonalInfo from "./PersonalInfo";
import { signOut } from "next-auth/react";
import AddFurniture from "./AddFurniture";
import MyFavoriteProducts from "./MyFavoriteProducts";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
};

const ProfileBody = () => {
    const [value, setValue] = useState(0);
    const [isAdmin,setIsAdmin] = useState(false);
    const isLargeScreen = useMediaQuery('(min-width: 900px)');    

    const profileBodyStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        bgcolor: 'secondary.main',
        padding: '25px 15px',
        borderRadius: '10px'
    };

    useEffect(() => {
        try {
          const fetchProfileData = async () => {
            const response = await fetch("/api/profile")
            const data = await response.json();
            setIsAdmin(data?.user?.isAdmin);            
          };  
    
          fetchProfileData();
        } catch (error) {
          console.log(error);
        }
      }, []);

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                {children}
              </Box>
            )}
          </div>
        );
    };

    function a11yProps(index: number) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box component={'div'} sx={{ mt: 5 }}>
            <CssBaseline />
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} md={6} lg={4}>
                    <Box sx={{...profileBodyStyle, width: isLargeScreen ? '80%' : '100%'}}>
                        <Typography variant="h4">MY ACCOUNT</Typography>
                        <Tabs
                            orientation="vertical"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ mt: 4 }}
                        >
                            <Tab 
                                sx={{ 
                                    minHeight: '45px',  flexDirection: 'row',
                                    alignItems: 'center', justifyContent: 'flex-start', 
                                    display: 'flex',  
                                }} 
                                icon={<PersonIcon sx={{ minWidth: '45px' }} />} 
                                label="PERSONAL INFORMATION" 
                                {...a11yProps(0)} 
                            />
                            <Tab 
                                sx={{ 
                                    minHeight: '45px',  flexDirection: 'row',
                                    alignItems: 'center', justifyContent: 'flex-start', 
                                    display: 'flex'
                                }}                                 
                                icon={<FavoriteBorderIcon sx={{ minWidth: '45px' }} />} 
                                label="FAVORITES" 
                                {...a11yProps(1)} 
                            />
                            {isAdmin && <Tab 
                                sx={{ 
                                    minHeight: '45px',  flexDirection: 'row',
                                    alignItems: 'center', justifyContent: 'flex-start', 
                                    display: 'flex'
                                }}                                 
                                icon={<WeekendOutlinedIcon sx={{ minWidth: '45px' }} />} 
                                label="ADD FURNITURE" 
                                {...a11yProps(2)} 
                            />}
                        </Tabs>
                        <List sx={{ mt: 3 }} onClick={() => signOut()}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', minWidth: '45px' }}>                                
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText sx={{ fontSize: '0.875rem' }} primary="SIGN OUT" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <Box sx={{ width: isLargeScreen ? '70%' : '100%' }}>
                        <TabPanel value={value} index={0}>
                            <PersonalInfo />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <MyFavoriteProducts />
                        </TabPanel>
                        {isAdmin && <TabPanel value={value} index={2}>
                            <AddFurniture />
                        </TabPanel>}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfileBody;
