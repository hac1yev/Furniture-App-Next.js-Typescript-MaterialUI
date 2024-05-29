declare type ParamsType = {
    params: {
        id: string;
    }
};

declare type ProductItemType = {
    id: string;
    image: string;
    furniture: string;
    title: string;
    price: number;
};

declare type ProductTypes = {
    _id: string;
    image: string;
    furniture: string;
    price: number;
    f_collection: string;
    description: string;
    title: string;
    views: number;
};

declare type ProductListTypes = {
    products: ProductTypes[]
};

declare type ProductListCompTypes = {
    filteredProducts: ProductTypes[];
    productPage: number;
}

declare type SearchWrapperCompType = {
    products: ProductTypes[];
    count: number;
    q: string;
  };

declare type SimiliarProductTypes = {
    product: string;
    productId: string;
};

declare type MyShoppingProductTypes = {
    _id: number;
    product: ProductTypes;
    count: number;
};

declare interface CardDetails {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    postalCode: string;
  };

declare type FavoriteHookTypes = {
    addFavorites: (id: string) => void;
    removeFavorites: (id: string) => void;
};

declare type FavoriteSliceTypes = {
    selectedId: string[];
    allFavorites: ProductTypes[];
};

declare type ProductSliceTypes = {
    products: ProductTypes[];
    categoryCollection: string[];
    filteredProducts: ProductTypes[];
};

declare type AllProductsTypes = {
    filteredProducts: ProductTypes[];
    productsReducer: AllProductsTypes;
}

declare type SearchType = {
    openSearch: boolean;
    setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

declare type PageNavigationTypes = {
    arr: {
        id: string,
        title: string,
        pathname: string
    }[]
};
  
declare type CountType = {
    count: number
};

declare type PaginationType = {
    productPage: number;
    paginationCount: number | false;
};

declare type PasswordType = {
    password: string;
    handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

declare type SendEmailTypes = {
    email: string;
    emailType: string;
    userId: string;
};