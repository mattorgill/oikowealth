import React, { useCallback, useContext, useState } from "react";
import axios from 'axios';

import { useGlobalContext } from "./GlobalContext";


const CategoryContext = React.createContext();

export const CategoryProvider = ({children}) => {

    const [categories, setCategories] = useState([]);
    const [categoryError, setCategoryError] = useState(null);
    const {BASE_URL} = useGlobalContext();

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-categories`, {withCredentials: true});
            setCategories(response.data);
        } catch (err) {
            setCategoryError(err.response.data.message);
        }
    }, [BASE_URL]);

    const addCategory = useCallback(async (category) => {
        try {
            console.log(category);
            const response = await axios.post(`${BASE_URL}add-category`, category, {withCredentials: true});
            fetchCategories();
            return true;
        } catch (err) {
            setCategoryError(err); //.response.data.message); // you set the error data to message fyi
            return false;
        }
    }, [fetchCategories, BASE_URL]);

    const updateCategory = useCallback(async (id, category) => {
        try {
            const response = await axios.post(`${BASE_URL}update-category/${id}`, category, {withCredentials: true});
            fetchCategories();
            return true;
        } catch (err) {
            setCategoryError(err.response.data.message); // you set the error data to message fyi
            return false;
        }
    }, [fetchCategories, BASE_URL]);

    const deleteCategory = useCallback(async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-category/${id}`, {withCredentials: true});
            fetchCategories();
        } catch (err) {
            setCategoryError(err.response.data.message);
        }
    }, [fetchCategories, BASE_URL]);

    return (
        <CategoryContext.Provider value = {{
            addCategory,
            fetchCategories,
            categories,
            updateCategory,
            deleteCategory,
            categoryError,
            setCategoryError
        }}>
            {children}
        </CategoryContext.Provider>
    );
}

export const useCategoryContext = () => {
    return useContext(CategoryContext);
};