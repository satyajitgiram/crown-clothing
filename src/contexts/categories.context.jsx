import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";


//as the actuall value you want to access
export const CategoriesContext = createContext({
    categoriesMap:{},
});



export const CategoriesProvider = ({children}) =>{
    const [categoriesMap, setcategoriesMap] = useState({});

    // // used for to add Data from SHOP_DATA to the firebase
    // useEffect(()=>{
    //     addColllectionAndDocuments('categories', SHOP_DATA)
    // }, [])

    useEffect(() =>{
        const getCategoriesMap = async () =>{
            const categoryMap = await getCategoriesAndDocuments()
            console.log(categoryMap);
            setcategoriesMap(categoryMap)
        }
        getCategoriesMap();
    
    }, []);


     



    const value = {categoriesMap}; 

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
