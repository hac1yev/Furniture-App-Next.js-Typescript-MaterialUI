import PageNavigations from "@/components/PageNavigations/PageNavigations";
import ShoppingProducts from "@/components/Shopping/ShoppingProducts";
import SummaryCheckout from "@/components/Shopping/SummaryCheckout";
import { Container, Grid, Typography } from "@mui/material";

const navigation_data = [
    {
      id: "p1",
      title: "Home",
      pathname: "/",
    },
    {
      id: "p2",
      title: "Shopping cart",
      pathname: "/shopping-cart",
    },
  ];

const ShoppigCartPage = () => {
    return (
        <Container
            component="div"
            maxWidth={false}
            sx={{ mt: 8, width: "100%" }}
        >
            <PageNavigations arr={navigation_data} />
            <Typography variant='h1' sx={{ marginY: 5 }}>SHOPPING CART</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                    <ShoppingProducts />
                </Grid>
                <Grid item xs={12} md={3}>
                    <SummaryCheckout />
                </Grid>
            </Grid>

        </Container>
    );
};

export default ShoppigCartPage;