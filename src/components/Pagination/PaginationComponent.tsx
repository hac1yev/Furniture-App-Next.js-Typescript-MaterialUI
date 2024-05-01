"use client";

import { Pagination, Stack } from "@mui/material";
import './PaginationComponent.css'
import { useRouter, useSearchParams } from "next/navigation";

type CountType = {
    count: number
};

const PaginationComponent = ({ count }: CountType) => {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const page = Number(searchParams.get("page")) || 1;

    const paginationCount = Math.ceil(count / 8);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
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