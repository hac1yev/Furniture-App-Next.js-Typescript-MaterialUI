"use client"

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B8926A',
    },
    secondary: {
      main: '#D4C8BE',
    },
    info: {
      main: 'rgba(184, 146, 106, 0.1)'
    }
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: '52px',
      color: '#2D2D2B',
      fontWeight: '700',
      lineHeight: '52px',
    },
    h2: {
      fontSize: '48px',
      color: '#B8926A',
      fontWeight: '700',
      lineHeight: '44px'
    },
    h3: {
      fontSize: '40px',
      color: '#2D2D2B',
      fontWeight: '700',
      lineHeight: '44px'
    },
    h4: {
      fontSize: '34px',
      textAlign: 'center',
      fontWeight: '700',
      lineHeight: '32px',
      color: '#2D2D2B'
    },
    h6: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '28px',
      color: '#B8926A'
    },
    subtitle1: {
      fontSize: '20px',
      fontWeight: '500',
      lineHeight: '28px',
      color: '#2D2D2B'
    },
    subtitle2: {
      fontSize: '20px',
      fontWeight: '500',
      lineHeight: '28px',
      color: '#6D6D6B'
    },
  },
});

export default theme;