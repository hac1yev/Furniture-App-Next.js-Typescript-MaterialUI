"use client";

import { Pagination, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type PaginationType = {
  productPage: number;
  paginationCount: number | false;
};

const ProductsPagination = ({
  productPage,
  paginationCount,
}: PaginationType) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePaginationChange = async (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${value}`);
    router.push(`/products?${params}`);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        onChange={handlePaginationChange}
        size="large"
        page={productPage}
        count={paginationCount as number}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default ProductsPagination;
