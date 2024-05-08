import AllProducts from '@/components/Products/AllProducts';
import { Suspense } from 'react';

const ProductsPage = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <AllProducts />
      </Suspense>
    </>
  );
};

export default ProductsPage;