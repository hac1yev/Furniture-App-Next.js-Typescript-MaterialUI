"use client";

import { CollectionTitles } from "@/dummy_data/data";
import useCatCol from "@/hooks/useCatCol";
import { Box, Checkbox, Typography } from "@mui/material";
import { memo } from "react";

const ProductCollections = () => {
    const handleCatColChange = useCatCol();

    return (
        <>
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
                    onChange={handleCatColChange.bind(null, item.title)}
                    />
                    {item.title}
                </Box>
                ))}
            </Box>
        </>
    );
};

export default memo(ProductCollections);
