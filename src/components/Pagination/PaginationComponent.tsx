"use client";

import { Pagination, Stack } from "@mui/material";
import './PaginationComponent.css'
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type CountType = {
    count: number
};

const PaginationComponent = ({ count }: CountType) => {
    const [page, setPage] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams(); 

    const paginationCount = Math.ceil(count / 8);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        const params = new URLSearchParams(searchParams);  

        params.set("page", `${value}`);

        router.push(`/search?${params}`);        

    };

    return (
        <Stack spacing={2} sx={{ marginTop: 6 }} >
            <Pagination count={paginationCount} page={page} onChange={handleChange} variant="outlined" size="large" shape="rounded" />
        </Stack>
    );
};

export default PaginationComponent;