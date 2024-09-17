const CategorySchema = require("../models/CategoryModel");
const UserSchema = require("../models/UserModel");

exports.addCategory = async (req, res) => {
    const {name, type, icon} = req.body;
    const user = req.session.user;

    if (!user) {
        return res.status(400).json({message: 'Not authorized. Need to be logged in.'});
    }

    const userId = user._id;
    const category = CategorySchema({
        name: name,
        type: type,
        icon: icon,
        user: userId
    });

    try {
        console.log(category);

        if (!name || !icon) {
            return res.status(400).json({message: 'All fields are required.'});
        }

        await category.save();

        console.log('saved');

        await UserSchema.findByIdAndUpdate(userId,{ 
            $push: {
                customCategories: category._id
            }
        });

        console.log('great');

        res.status(200).json({message: 'Custom Category Added'});

    } catch (error) {
        console.log("error ", error);
        res.status(500).json({message: 'Server Error - ' + error});
    }
}

exports.getCategories = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(400).json({message: 'Not authorized. Need to be logged in.'});
        }

        const userId = user._id;
        const categories = await CategorySchema.find({ user: userId });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: 'Server Error - ' + error});
    }
}

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;

    try {
        const updateCustomCategory = await CategorySchema.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: category.name,
                    icon: category.icon
                }
            },
            { new: true, runValidators: true } 
        );

        if (!updateCustomCategory) {
            return res.status(404).json({ message: 'Custom Category not found' });
        }

        res.status(200).json({message: 'Custom category has been updated!'});
    } catch (error) {
        res.status(500).json({message: 'Server Error - ' + error});
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(400).json({message: 'Not authorized. Need to be logged in.'});
        }

        const userId = user._id;
        const {id} = req.params;
        const categoryToDelete = await CategorySchema.findOne({ _id: id, user: userId });

        if (!categoryToDelete) {
            res.status(404).json({message: 'Custom category not found or you are not authorized to delete it.'});
        }

        const response = await CategorySchema.findByIdAndDelete(id)

        // await UserSchema.updateOne(
        //     { _id: userId },
        //     {
        //         $pull: {
        //             customCategories: id
        //         }
        //     }
        // );

        res.status(200).json({message: 'Custom Category Deleted'});
            
    } catch (error) {
        res.status(500).json({message: 'Server Error - ' + error});
    }
}