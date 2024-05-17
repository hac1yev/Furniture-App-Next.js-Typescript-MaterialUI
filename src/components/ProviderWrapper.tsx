import { useSelector } from "react-redux";
import LoadingOverlay from "./LazyLoading/LoadingOverlay";

const ProviderWrapper = () => {
    const isLoading = useSelector((state: any) => state.loadingReducer.isLoading);

    return (
        <>
            {isLoading && <LoadingOverlay overlayText="Searching..." />}
        </>
    );
};

export default ProviderWrapper;