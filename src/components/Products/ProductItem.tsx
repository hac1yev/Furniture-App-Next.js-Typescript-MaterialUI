"use client";

import { Box, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useFavorites from "@/hooks/useFavorites";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type HookTypes = {
  addFavorites: (id: string) => void;
  removeFavorites: (id: string) => void;
};

type ProductItemType = {
    id: string;
    image: string;
    furniture: string;
    title: string;
    price: number;
};

const ProductItem = ({ id, image, furniture, title, price }: ProductItemType) => {
  const { data: session } = useSession();
  const { addFavorites, removeFavorites }: HookTypes = useFavorites();
  const selectedId = useSelector((state: any) => state.favoriteReducer.selectedId);
  const navigation = useRouter();

  const handleAddFavorites = (id: string) => {
    if (session) {
      addFavorites(id);
    } else {
      navigation.push("/login");
    }
  };

  return (
    <Grid
      className="product-item"
      item
      xs={12}
      sm={6}
      md={6}
      lg={4}
      padding={1}
    >
      <Link href={`/products/${id}`}>
        <Box className="product-item-img">
          <Image
            style={{ objectFit: "cover", borderRadius: "10px" }}
            sizes="(max-width: 768px) 100vw, 33vw"
            src={image}
            alt={furniture}
            priority
            fill
          />
        </Box>
        <Typography sx={{ marginTop: 1 }} variant="subtitle1">
          {title}
        </Typography>
        <Box sx={{ marginTop: 1 }} component="span">{`${price}$`}</Box>
      </Link>
      <Box className="heart-box">
        {selectedId?.includes(id) ? (
          <FavoriteIcon onClick={() => removeFavorites(id)} />
        ) : (
          <FavoriteBorderOutlinedIcon
            onClick={() => handleAddFavorites(id)}
          />
        )}
      </Box>
    </Grid>
  );
};

export default ProductItem;