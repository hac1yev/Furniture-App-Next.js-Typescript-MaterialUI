import { favoriteSliceAction } from "@/store/favorite-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFavorites = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async function fetchSelectedId() {
            const response = await fetch("/api/favorites");
            const data = await response.json();            

            dispatch(favoriteSliceAction.getSelectedIds(data?.data?.favorites));
        })();
    }, [dispatch]);

    const addFavorites = async (id: string) => {
        await fetch('/api/favorites', {
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        });       

        dispatch(favoriteSliceAction.addFavorites(id));    
    };

    const removeFavorites = async (id: string) => {
        await fetch('api/favorites', {
            method: 'PUT',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch(favoriteSliceAction.removeFavorites(id));    
    };

    return {
        addFavorites,
        removeFavorites,
    };
};

export default useFavorites;