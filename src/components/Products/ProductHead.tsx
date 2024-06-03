"use client";

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Grid, ListItem, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SortIcon from "@mui/icons-material/Sort";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productsSliceAction } from "@/store/products-slice";
import { CategoryTitles, CollectionTitles } from "@/dummy_data/data";
import useCatCol from "@/hooks/useCatCol";
import './ProductHead.css';

const ProductHead = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isLarge = useMediaQuery("(max-width:899.5px)");
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleCatColChange = useCatCol();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePriceLowToHigh = () => {    
    dispatch(productsSliceAction.sortPriceLowToHigh());
    setAnchorEl(null);
  };
  const handlePriceHighToLow = () => {    
    dispatch(productsSliceAction.sortPriceHighToLow());
    setAnchorEl(null);
  };
  const handlePriceAtoZ = () => {
    dispatch(productsSliceAction.sortPriceAtoZ());
    setAnchorEl(null);
  };

  return (
    <>
      <Grid item xs={12} sm={6} lg={4} padding={1} sx={{ marginTop: 5 }}>
        <Box
          className="product-title-item"
          sx={isLarge ? { margin: "0 auto" } : { textAlign: "start" }}
        >
          <Typography
            variant="h3"
            sx={isLarge ? { textAlign: "center" } : { textAlign: "start" }}
            className={"products-header"}
          >
            PRODUCTS
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
        padding={1}
        sx={{
          display: "flex",
          flexDirection: isLarge ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 1,
        }}
        className="product-head-wrapper"
      >
        <Box component="article" sx={{ maxWidth: "500px", width: "100%", position: "relative" }}>
          <Typography sx={{ opacity: 0.5, width: "100%" }}>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime.
          </Typography>
        </Box>
        {!isLarge && (
            <>
              <Button
                variant="outlined"
                size="large"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  width: isLarge ? "100%" : "auto",
                  border: "1px solid primary.main",
                  px: 6,
                }}
              >
                <SortIcon sx={{ marginRight: 1 }} />
                SORT PRODUCTS
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                sx={{ maxWidth: '264.64px', width: '100%' }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handlePriceAtoZ}>A to Z</MenuItem>
                <MenuItem onClick={handlePriceLowToHigh}>Price: Low to High</MenuItem>
                <MenuItem onClick={handlePriceHighToLow}>Price: High to Low</MenuItem>
              </Menu>
            </>
        )}
        {isLarge && (
          <>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>SORT PRODUCTS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <ListItem onClick={handlePriceAtoZ}>
                    <Typography>A to Z</Typography>
                  </ListItem>
                  <ListItem onClick={handlePriceLowToHigh}>
                    <Typography>Price: Low to High</Typography>
                  </ListItem>
                  <ListItem onClick={handlePriceHighToLow}>
                    <Typography>Price: High to Low</Typography>
                  </ListItem>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>CATEGORIES</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {CategoryTitles.map((item) => (
                    <Grid 
                      item
                      className="mobile-checkbox" 
                      sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                      key={item.id}
                      sm={4}
                      xs={6}
                    >
                        <Checkbox
                          sx={{
                              color: "primary.main",
                              "&.Mui-checked": {
                              color: "primary.main",
                              },
                          }}
                          onChange={handleCatColChange.bind(null, item.title)}
                        />
                        {item.title}
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>COLLECTIONS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {CollectionTitles.map((item) => (
                    <Grid 
                      item
                      className="mobile-checkbox" 
                      sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                      key={item.id}
                      sm={4}
                      xs={6}
                    >
                        <Checkbox
                          sx={{
                              color: "primary.main",
                              "&.Mui-checked": {
                              color: "primary.main",
                              },
                          }}
                          onChange={handleCatColChange.bind(null, item.title)}
                        />
                        {item.title}
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Grid>
    </>
  );
};

export default ProductHead;
