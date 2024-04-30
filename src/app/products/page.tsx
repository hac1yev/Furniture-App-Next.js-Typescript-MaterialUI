"use client";

import React, { useEffect, useReducer, useState } from "react";
import "../../components/Home/Products/Products.css";
import { Box, Button, Checkbox, Container, Grid, Pagination, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import PageNavigations from "@/components/PageNavigations/PageNavigations";
import SortIcon from "@mui/icons-material/Sort";
import { navigation_data, CollectionTitles, CategoryTitles } from "@/dummy_data/data";
import useFavorites from "@/hooks/useFavorites";

type FurnitureType = {
  _id: string;
  description: string;
  title: string;
  price: number;
  furniture: string;
  image: string;
};

type AllFurnituresType = {
  furnitures: FurnitureType[];
};

type HookTypes = {
  addFavorites: (id: string) => void;
  removeFavorites: (id: string) => void;
};

type StateType = {
  categories: string[];
  collections: string[];
};

const initialState: StateType = {
  categories: [],
  collections: [],
};

type ActionType = {
  type: "collection" | "category";
  payload: {
    title: string;
    isChecked: boolean;
  };
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "category":
      return {
        ...state,
        categories: action.payload.isChecked
          ? [...state.categories, action.payload.title]
          : state.categories.filter(
              (item: string) => item !== action.payload.title
            ),
      };
    case "collection":
      return {
        ...state,
        collections: action.payload.isChecked
          ? [...state.collections, action.payload.title]
          : state.collections.filter(
              (item: string) => item !== action.payload.title
            ),
      };
    default:
      return state;
  };
};

const ProductsPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectedId = useSelector((state: any) => state.favoriteReducer.selectedId);
  const [furnitures, setFurnitures] = useState<AllFurnituresType | null>(null);
  const { addFavorites, removeFavorites }: HookTypes = useFavorites();
  const { data: session } = useSession();
  const navigation = useRouter();
  const isLarge = useMediaQuery("(max-width:899.5px)");
  const [anchorEl, setAnchorEl] = useState(false);
  const [productPage,setProductPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();

  let filteredProducts;

  if (
    (state as StateType)?.categories.length === 0 &&
    (state as StateType)?.collections.length === 0
  ) {
    filteredProducts = furnitures;
  } else if (
    (state as StateType)?.categories.length > 0 &&
    (state as StateType)?.collections.length === 0
  ) {
    filteredProducts =
      Array.isArray(furnitures) &&
      furnitures.filter((product) =>
        (state as StateType)?.categories.some((category: string) =>
          product?.furniture?.includes(category)
        )
      );
  } else if (
    (state as StateType)?.categories.length === 0 &&
    (state as StateType)?.collections.length > 0
  ) {
    filteredProducts =
      Array.isArray(furnitures) &&
      furnitures.filter((product) =>
        (state as StateType)?.collections.some((collection: string) =>
          product?.f_collection?.includes(collection)
        )
      );
  } else {
    filteredProducts =
      Array.isArray(furnitures) &&
      furnitures.filter(
        (product) =>
          (state as StateType)?.categories.some((category: string) =>
            product?.furniture?.includes(category)
          ) &&
          (state as StateType)?.collections?.includes(product?.f_collection)
      );
  }

  useEffect(() => {
    const fetchFurnitures = async () => {
      const response = await fetch("/api/products");
      const { data } = await response.json();
      setFurnitures(data);
    };

    fetchFurnitures();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set("page", `${productPage}`);

    router.push(`/products?${params}`); 
  }, [productPage, router, searchParams]);

  const handleAddFavorites = (id: string) => {
    if (session) {
      addFavorites(id);
    } else {
      navigation.push("/login");
    }
  };

  const handleCategoryChange = (
    title: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "category",
      payload: {
        title: title.toLocaleLowerCase(),
        isChecked: event.target.checked,
      },
    });
  };

  const handleCollectionChange = (
    title: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "collection",
      payload: {
        title: title.toLocaleLowerCase(),
        isChecked: event.target.checked,
      },
    });
  };

  const handleSort = () => {
    setAnchorEl(true);
  };

  if(anchorEl) {
    Array.isArray(filteredProducts) && filteredProducts.sort((a,b) => b.price - a.price);
  }

  let paginatioCount = Array.isArray(filteredProducts) && Math.ceil(filteredProducts.length / 9)

  const handlePaginationChange = async (e: React.ChangeEvent<unknown>, value: number) => {
    setProductPage(value);
  };

  if (!furnitures) {
    return (
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", marginTop: 8 }}
      >
        Loading...
      </Typography>
    );
  }

  return (
    <Container component="div" maxWidth={false} sx={{ mt: 4, width: "100%" }}>
      <PageNavigations arr={navigation_data} />
      <Grid item xs={12} sm={6} lg={4} padding={1} sx={{ marginTop: 5 }}>
        <Box className="product-title-item">
          <Typography variant="h3" className={"products-header"}>
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
          gap: 2,
        }}
      >
        <Box sx={{ maxWidth: "500px", width: "100%", position: "relative" }}>
          <Typography sx={{ opacity: 0.5, width: "100%" }}>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="large"
          onClick={handleSort}          
          sx={{
            width: isLarge ? "100%" : "auto",
            border: "1px solid primary.main",
            px: 6,
          }}
        >
          <SortIcon sx={{ marginRight: 1 }} />
          SORT BY PRICE
        </Button>
      </Grid>
      <Grid container sx={{ marginY: 8 }}>
        <Grid container sm={12} md={3} lg={3}>
          <Box component={"div"}>
            <Typography variant="h6" sx={{ marginLeft: "10px" }}>
              CATEGORIES
            </Typography>
            <Box component={"div"} sx={{ marginY: 2 }}>
              {CategoryTitles.map((item) => (
                <Box
                  component={"div"}
                  key={item.id}
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Checkbox
                    sx={{
                      color: "primary.main",
                      "&.Mui-checked": {
                        color: "primary.main",
                      },
                    }}
                    onChange={handleCategoryChange.bind(null, item.title)}
                  />
                  {item.title}
                </Box>
              ))}
            </Box>
            <Typography variant="h6" sx={{ marginLeft: "10px", marginTop: 6 }}>
              COLLECTIONS
            </Typography>
            <Box component={"div"} sx={{ marginY: 2 }}>
              {CollectionTitles.map((item) => (
                <Box
                  component={"div"}
                  key={item.id}
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Checkbox
                    sx={{
                      color: "primary.main",
                      "&.Mui-checked": {
                        color: "primary.main",
                      },
                    }}
                    onChange={handleCollectionChange.bind(null, item.title)}
                  />
                  {item.title}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid container sm={12} md={9} lg={9}>
          {Array.isArray(filteredProducts) &&
            filteredProducts.slice(((productPage - 1) * 9), productPage * 9)?.map((item: FurnitureType) => (
              <Grid
                className="product-item"
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                key={item._id}
                padding={1}
              >
                <Link href={`/products/${item._id}`}>
                  <Box className="product-item-img">
                    <Image
                      style={{ objectFit: "cover", borderRadius: "10px" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      src={item.image}
                      alt={item.furniture}
                      priority
                      fill
                    />
                  </Box>
                  <Typography sx={{ marginTop: 1 }} variant="subtitle1">
                    {item.title}
                  </Typography>
                  <Box
                    sx={{ marginTop: 1 }}
                    component="span"
                  >{`${item.price}$`}</Box>
                </Link>
                <Box className="heart-box">
                  {selectedId?.includes(item._id) ? (
                    <FavoriteIcon onClick={() => removeFavorites(item._id)} />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      onClick={() => handleAddFavorites(item._id)}
                    />
                  )}
                </Box>
              </Grid>
            ))}
        </Grid>
        <Grid container sm={12} md={3} lg={3}></Grid>
        <Grid 
          container 
          sm={12} 
          md={9} 
          lg={9} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginY: 8 
          }}
        >
            <Stack spacing={2}>
              <Pagination onChange={handlePaginationChange} size="large" page={productPage} count={paginatioCount as number} variant="outlined" shape="rounded" />
            </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsPage;