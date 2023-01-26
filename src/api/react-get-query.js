import { useQuery } from "react-query";
import axios from "axios";

const fetchItem = async (id) => {
    
    const { data } = await axios.get(
        `http://localhost:8000/items/${id}`
    );
    return data;
};
export const useFetchItem = (id) => {
    return useQuery(["item",id] ,()=>fetchItem(id));
    
};

const fetchItemAll = async () => {
    
    const { data } = await axios.get(
        "http://localhost:8000/items"
    );
    return data;
};
export const useFetchItemAll = () => {
    return useQuery(["item"] ,()=>fetchItemAll());
    
};

const fetchCategory = async () => {
    const { data } = await axios.get(
        "http://localhost:8000/category"
    );
    return data;
};
export const useFetchCategory = () => {
    return useQuery("category", fetchCategory);
};

const fetchCartItem = async () => {
    const { data } = await axios.get(
        "http://localhost:8000/cart"
    );
    console.log(data);
    return data;
};
export const useFetchCartItem = () => {
    return useQuery("cart", fetchCartItem);
};