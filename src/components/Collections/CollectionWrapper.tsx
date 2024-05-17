"use client";

import { collectionData } from "@/dummy_data/data";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import PageNavigations from "../PageNavigations/PageNavigations";
import "../Home/CollectionSlide/CollectionSlide.css";

const CollectionWrapper = () => {
  const navigation_data = [
    {
      id: "p1",
      title: "Home",
      pathname: "/",
    },
    {
      id: "p2",
      title: "Collections",
      pathname: "/collections",
    },
  ];

  return (
    <Container
      component="div"
      maxWidth={false}
      sx={{ marginTop: 8, marginBottom: 5, width: "100%" }}
    >
      <PageNavigations arr={navigation_data} />
      <Grid item xs={12} sm={6} lg={4} padding={1} sx={{ marginTop: 4 }}>
        <Box className="collections-header">
          <Typography variant="h1" className={"products-header"}>
            COLLECTIONS
          </Typography>
        </Box>
      </Grid>
      <Grid container>
        {collectionData.map((collection) => (
          <Grid
            className="product-item"
            item
            key={collection.id}
            xs={12}
            sm={6}
            lg={4}
            padding={1}
          >
            <Link href={`/products`}>
              <Box className="product-item-img">
                <Image
                  style={{ objectFit: "cover", borderRadius: "10px" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src={collection.img}
                  alt={""}
                  priority
                  fill
                />
                <Box component={"div"} className="furniture-slider-blur">
                  <Typography>{collection.title}</Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CollectionWrapper;