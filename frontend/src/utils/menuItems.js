import {icons} from "./icons";

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: icons.find(icon => icon.name === 'house').icon,
        link: '/dashboard'
    },
    {
        id: 2,
        title: 'Transactions',
        icon: icons.find(icon => icon.name === 'credit card').icon,
        link: '/dashboard'
    },
    {
        id: 3,
        title: 'Budget',
        icon: icons.find(icon => icon.name === 'money').icon,
        link: '/dashboard'
    },
    {
        id: 4,
        title: 'Categories',
        icon: icons.find(icon => icon.name === 'cog').icon,
        link: '/dashboard'
    },
    {
        id: 5,
        title: 'Import',
        icon: icons.find(icon => icon.name === 'file import').icon,
        link: '/dashboard'
    },
    {
        id: 6,
        title: 'User Management',
        icon: icons.find(icon => icon.name === 'users').icon,
        link: '/dashboard'
    },
    {
        id: 7,
        title: 'Profile',
        icon: icons.find(icon => icon.name === 'user profile').icon,
        link: '/dashboard'
    }
]