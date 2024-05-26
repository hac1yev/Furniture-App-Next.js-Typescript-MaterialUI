"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const PasswordInput = ({ password, handlePassword }: PasswordType) => {
  const [showPassword, setShowPassword] = useState(false);  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      size="medium"
      margin="dense"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={handlePassword}
      placeholder="Password *"
      required={true}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default PasswordInput;