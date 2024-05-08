"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const AddFurniture = () => {
  const [pickedImage, setPickedImage] = useState<string | null>("");

  const submitProfileInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await fetch("/api/profile/add-furniture", {
        method: "POST",
        body: JSON.stringify({
          image: pickedImage,
          furniture: data.get("furniture") || null,
          f_collection: data.get("f_collection") || null,
          price: data.get("price"),
          title: data.get("title"),
          description: data.get("description"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const fileReader = new FileReader();

    if (!file) {
      setPickedImage(null);
      return;
    }

    fileReader.onload = () => {
      if (fileReader.result instanceof ArrayBuffer) {
        // Handle the case where the result is an ArrayBuffer
        setPickedImage(null);
      } else if (typeof fileReader.result === "string") {
        // Handle the case where the result is a data URL
        setPickedImage(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <Box component="form" noValidate onSubmit={submitProfileInfo}>
      <TextField
        margin="dense"
        type="file"
        required
        fullWidth
        placeholder="Image *"
        id="image"
        name="image"
        onChange={handleFileChange}
        autoComplete="image"
      />
      <TextField
        margin="dense"
        required
        fullWidth
        placeholder="Furniture *"
        id="furniture"
        name="furniture"
        autoComplete="furniture"
      />
      <TextField
        margin="dense"
        required
        fullWidth
        placeholder="Collection *"
        id="f_collection"
        name="f_collection"
        autoComplete="f_collection"
      />
      <TextField
        margin="dense"
        type="number"
        required
        fullWidth
        placeholder="Price *"
        id="price"
        name="price"
        autoComplete="price"
      />
      <TextField
        margin="dense"
        type="text"
        required
        fullWidth
        placeholder="Title *"
        id="title"
        name="title"
        autoComplete="title"
      />
      <TextField
        margin="dense"
        fullWidth
        placeholder="Description *"
        id="description"
        name="description"
        autoComplete="description"
      />
      <Button
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: "primary.main",
          color: "#fff",
          "&:hover": {
            bgcolor: "primary.main",
          },
        }}
      >
        Add Furniture
      </Button>
    </Box>
  );
};

export default AddFurniture;
