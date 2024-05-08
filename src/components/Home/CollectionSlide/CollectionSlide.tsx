import SliderPreloader from "@/components/LazyLoading/LazyLoading";
import { Container } from "@mui/material";
import dynamic from "next/dynamic";

const CollectionItems = dynamic(() => import("./CollectionItems"), {
  ssr: false,
  loading: () => <SliderPreloader />
})

const CollectionSlide = () => {  

    return (
        <Container 
            component="div"
            maxWidth={false}
            sx={{ my: 8, width: "100%" }}
        >
            <CollectionItems/>
        </Container>
    );
};

export default CollectionSlide;