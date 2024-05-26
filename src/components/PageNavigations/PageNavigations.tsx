"use client";

import { Box, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import './PageNavigations.css';

const PageNavigations = (props: PageNavigationTypes) => {
  return (
    <Box>
      <Grid container>
        {props.arr.map((item,i) => (
          <Grid key={i} item className="page-nav">
            <Link
              href={item.pathname}
            >
              {item.title}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PageNavigations;
