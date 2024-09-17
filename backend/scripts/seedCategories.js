const CategorySchema = require("../models/CategoryModel");

const defaultCategoryData = [
    { name: 'salary',           type: 'income',     icon: 'money'},
    { name: 'freelance',        type: 'income',     icon: 'earth'},
    { name: 'stocks',           type: 'income',     icon: 'arrow-trend-up'},
    { name: 'bank',             type: 'income',     icon: 'bank'},
    { name: 'other',            type: 'income',     icon: 'dollar'},

    { name: 'groceries',        type: 'expense',    icon: 'food'},
    { name: 'insurance',        type: 'expense',    icon: 'medical notes'},
    { name: 'gas',              type: 'expense',    icon: 'gas pump'},
    { name: 'utilities',        type: 'expense',    icon: 'tools'},
    { name: 'rent',             type: 'expense',    icon: 'house user'},
    { name: 'subscriptions',    type: 'expense',    icon: 'tv'},
    { name: 'dining',           type: 'expense',    icon: 'utensils'},
    { name: 'car',              type: 'expense',    icon: 'car'},
    { name: 'gift',             type: 'expense',    icon: 'gift'},
    { name: 'shopping',         type: 'expense',    icon: 'shirt'},
    { name: 'entertainment',    type: 'expense',    icon: 'gamepad'},
    { name: 'homegoods',        type: 'expense',    icon: 'kitchen set'},
    { name: 'medical',          type: 'expense',    icon: 'medical briefcase'},
    { name: 'haircut',          type: 'expense',    icon: 'scissors'},
    { name: 'beauty',           type: 'expense',    icon: 'smiling face'},
    { name: 'travel',           type: 'expense',    icon: 'plane'},
    { name: 'misc',             type: 'expense',    icon: 'puzzle'}
];

exports.seedDefaultCategories = async () => {
    
    try {

        const existingCategories = await CategorySchema.find({ user: null });

        if (existingCategories.length === 0) {
            console.log("No default categories, seeding db");
            await CategorySchema.insertMany(defaultCategoryData);
            console.log('Seeded default categories');
        } else {
            console.log('already seeded - ', existingCategories);
        }
        
        
    } catch (error) {
        console.error('Error seeding default categories:', error);
    }
};