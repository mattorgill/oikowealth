import React, { useState } from "react";
import Select from 'react-select';
import styled from "styled-components";
import { InnerLayout } from "../../assets/styles/Layouts";
import { icons } from "../../utils/icons";
import { useCategoryContext } from "../../context/CategoryContext";

function ManageCategories() {

    const {categories, addCategory, updateCategory, deleteCategory} = useCategoryContext();

    console.log('categories - ', categories);

    const [selectedIcon, setSelectedIcon] = useState('');
    const [selectedTab, setSelectedTab] = useState('income');
    const [showForm, setShowForm] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const iconOptions = icons.map(icon => ({
        value: icon.name,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {icon.icon}
                <span style={{ marginLeft: '10px' }}>{icon.name}</span>
            </div>
        ),
    }));

    const handleTabChange = (type) => {
        setSelectedTab(type);
        setShowForm(false); 
    };

    const handleAddCategory = () => {
        setShowForm(!showForm);
    };

    const handleIconChange = (selectedOption) => {
        setSelectedIcon(selectedOption);
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        // selectedIcon and newCategory
        addCategory({name: newCategoryName, type: selectedTab, icon: selectedIcon.value});
        setShowForm(false);
        setSelectedIcon('');
        setNewCategoryName('');
    };

    // const handleEditCategory = (id) => {
    //     // Logic for editing category
    // };

   

    const handleDeleteCategory = (id) => {
        deleteCategory(id);
    };

    return (
        <ManageCategoriesStyled>
            <InnerLayout>
                <div className="header">
                    <h1>Categories</h1>
                    <Tabs>
                        <TabButton active={selectedTab === "income" ? 1 : 0} onClick={() => handleTabChange("income")}>
                            Income
                        </TabButton>
                        <TabButton active={selectedTab === "expense" ? 1 : 0} onClick={() => handleTabChange("expense")}>
                            Expense
                        </TabButton>
                    </Tabs>
                </div>
    
                <div className="action-container">
                    <button className="add-button" onClick={handleAddCategory}>
                        {showForm ? "Cancel" : "Add Category"}
                    </button>
                </div>
                
                <CategoryColumns>
                    <CategoryList>
                        {categories.filter(category => category.type === selectedTab).map(category => (
                            <CategoryItem key={category._id}>
                                <div className="categoryIcon">{icons.find(icon => icon.name === category.icon).icon}</div>
                                <span>{category.name}</span>
                                <div className="actions">
                                    {/* <EditButton onClick={() => handleEditCategory(category._id)}>Edit</EditButton> */}
                                    <DeleteButton onClick={() => handleDeleteCategory(category._id)}>Delete</DeleteButton>
                                </div>
                            </CategoryItem>
                        ))}
                    </CategoryList>
    
                    {showForm && (
                        <Form onSubmit={handleCategorySubmit}>
                            <FormField>
                                <label htmlFor="iconSelect">Icon:</label>
                                <Select
                                    id="iconSelect"
                                    options={iconOptions}
                                    value={selectedIcon}
                                    onChange={handleIconChange}
                                    placeholder="--Choose an Icon--"
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor="categoryName">Category Name:</label>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    required
                                />
                            </FormField>
                            <SubmitButton type="submit">Create Category</SubmitButton>
                        </Form>
                    )}
                </CategoryColumns>
            </InnerLayout>
        </ManageCategoriesStyled>
    );
}

const ManageCategoriesStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        width: 100%;
    }

    .action-container {
        display: flex;
        justify-content: right;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
    }

    .add-button {
        padding: 0.6rem 1.2rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;

const CategoryColumns = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
    align-items: flex-start;
`;

const CategoryList = styled.div`
    flex: 1; /* Takes the remaining space */
    margin-right: 2rem;
`;

const Form = styled.form`
    width: 300px; /* Adjust this width as needed */
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CategoryItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 1rem;

    .actions {
        display: flex;
        gap: 1rem;
    }

    .categoryIcon {
        font-family: inherit;
        font-size: inherit;
        max-width: 1.5rem;
    }
`;

const EditButton = styled.button`
padding: 0.5rem 1rem;
background-color: #ffc107;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
&:hover {
    background-color: #e0a800;
}
`;

const DeleteButton = styled.button`
padding: 0.5rem 1rem;
background-color: #dc3545;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
&:hover {
    background-color: #c82333;
}
`;



const FormField = styled.div`
display: flex;
flex-direction: column;
label {
    margin-bottom: 0.5rem;
    font-weight: bold;
}
select, input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
}
`;

const SubmitButton = styled.button`
padding: 0.75rem;
background-color: #28a745;
color: white;
border: none;
border-radius: 8px;
cursor: pointer;
font-size: 1rem;
transition: background-color 0.3s;
&:hover {
    background-color: #218838;
}
`;

const Tabs = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 4px;
`;

const TabButton = styled.button`
    padding: 5px 10px;
    font-size: 1rem;
    background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
    color: ${(props) => (props.active ? "#fff" : "#000")};
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #0056b3;
        color: #fff;
    }
`;

export default ManageCategories;