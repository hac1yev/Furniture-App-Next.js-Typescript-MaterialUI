"use client";

import { CategoryTitles } from "@/dummy_data/data"
import useCatCol from "@/hooks/useCatCol";
import { Box, Checkbox, Typography } from "@mui/material"
import { memo } from "react";

const ProductCategories = () => {
    const handleCatColChange = useCatCol();

    return (
        <>
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
                            onChange={handleCatColChange.bind(null, item.title)}
                        />
                        {item.title}
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default memo(ProductCategories);