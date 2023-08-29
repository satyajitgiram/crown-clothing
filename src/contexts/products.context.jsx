import { createContext, useState, useEffect } from "react";
import { addColllectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import SHOP_DATA from "../shop-data.js";


//as the actuall value you want to access
export const ProductsContext = createContext({
    products:[],
});


export const ProductsProvider = ({children}) =>{
    const [products, setProducts] = useState([]);

    // // used for to add Data from SHOP_DATA to the firebase
    // useEffect(()=>{
    //     addColllectionAndDocuments('categories', SHOP_DATA)
    // }, [])


    const value = {products}; 

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
