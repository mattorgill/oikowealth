const UserSchema = require("../models/UserModel");
const bcrypt = require('bcrypt');
const { createDefaultCategories } = require('../services/CategoryService');

exports.registerUser = async (req, res) => {
    
    const {email, firstName, lastName, password} = req.body;
    // console.log("registering new user ", email, firstName, lastName, password);

    try {
        if (!password || !email || !firstName || !lastName) {
            return res.status(400).json({message: 'All fields are required!'});
        }

        // TODO: Strong Password Validation and valid email
        // if (!isValidPassword(password)) {
        //     return res.status(400).json({ error: "Password does not meet strength requirements. Password needs to conaint at least one digit, lowercase letter, uppercase letter, and one special characte, and the password needs to be at least 8 characters long." });
        // }

        const existingUsers = await UserSchema.countDocuments();
        const role = existingUsers === 0 ? 'admin' : 'user';

        // console.log("new user role: " + role);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = UserSchema({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            role
        });

        await newUser.save();

        req.session.user = {
            _id: newUser._id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role
        };
        
        // console.log("creating categories for ", newUser._id);

        await createDefaultCategories(newUser._id);

        res.status(200).json({message: 'User Created'});

    } catch (error) {
        if (error.code === 11000) {
            res.status(500).json({message: 'Email provided is already associated with another account. Please try again or click login to sign in.'});
        } else {
            res.status(500).json({message: 'Server Error | ' + error});
        }
    }
};

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    return passwordRegex.test(password);
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserSchema.findOne({email});

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials. Please try again.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. Please try again.'});
        }

        req.session.user = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        };

        res.status(200).json({ message: 'Logged in successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server Error | ' + error});
    }
};

exports.logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout.'});
        }
        
        res.clearCookie('connect.sid'); // might need to change this??
        res.status(200).json({ message: 'Logged out successfully!'});
    });
};

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserSchema.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: 'Server Error | ' + error});
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await UserSchema.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Server Error | ' + error});
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    try {
        const updatedUser = await UserSchema.findByIdAndUpdate(
            id,
            {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            },
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error | ' + error.message });
    }
};

exports.resetUserPassword = async (req, res) => {
    const { id } = req.params;

    try {
        // const newPassword = generateRandomPassword();
        const newPassword = '1234';

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const updatedUser = await UserSchema.findByIdAndUpdate(
            id,
            { $set: { password: hashedPassword } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally, you might want to send the new password to the user's email
        // sendNewPasswordToUserEmail(updatedUser.email, newPassword);

        res.status(200).json({
            message: 'Password reset successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error | ' + error.message });
    }
};

exports.setUserPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        // console.log("pass ", password);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await UserSchema.findByIdAndUpdate(
            id,
            { $set: { password: hashedPassword } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error | ' + error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        UserSchema.findByIdAndDelete(id)
            .then((user) => {
                res.status(200).json({message: 'User Deleted'});
            })
            .catch ((err) => {
                res.status(500).json({message: 'Server Error | ' + err});
            });
    } catch (error) {
        res.status(500).json({message: 'Server Error | ' + error});
    }
};

const generateRandomPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};