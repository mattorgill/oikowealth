const CategorySchema = require("../models/CategoryModel");

const defaultCategoryData = [
    { name: 'salary',           type: 'income',     icon: 'money',              user: null},
    { name: 'freelance',        type: 'income',     icon: 'earth',              user: null},
    { name: 'stocks',           type: 'income',     icon: 'arrow-trend-up',     user: null},
    { name: 'bank',             type: 'income',     icon: 'bank',               user: null},
    { name: 'other',            type: 'income',     icon: 'dollar',             user: null},

    { name: 'groceries',        type: 'expense',    icon: 'food',               user: null},
    { name: 'insurance',        type: 'expense',    icon: 'medical notes',      user: null},
    { name: 'gas',              type: 'expense',    icon: 'gas pump',           user: null},
    { name: 'utilities',        type: 'expense',    icon: 'tools',              user: null},
    { name: 'rent',             type: 'expense',    icon: 'house user',         user: null},
    { name: 'subscriptions',    type: 'expense',    icon: 'tv',                 user: null},
    { name: 'dining',           type: 'expense',    icon: 'utensils',           user: null},
    { name: 'car',              type: 'expense',    icon: 'car',                user: null},
    { name: 'gift',             type: 'expense',    icon: 'gift',               user: null},
    { name: 'shopping',         type: 'expense',    icon: 'shirt',              user: null},
    { name: 'entertainment',    type: 'expense',    icon: 'gamepad',            user: null},
    { name: 'homegoods',        type: 'expense',    icon: 'kitchen set',        user: null},
    { name: 'medical',          type: 'expense',    icon: 'medical briefcase',  user: null},
    { name: 'haircut',          type: 'expense',    icon: 'scissors',           user: null},
    { name: 'beauty',           type: 'expense',    icon: 'smiling face',       user: null},
    { name: 'travel',           type: 'expense',    icon: 'plane',              user: null},
    { name: 'misc',             type: 'expense',    icon: 'puzzle',             user: null}
];

const createDefaultCategories = async (userId) => {
    
    const categories = defaultCategoryData.map(d => ({ ...d, user: userId}));
    console.log("defaults for ", userId);
    console.log(" categories ", categories);
    await CategorySchema.insertMany(categories);
};

module.exports = { createDefaultCategories };