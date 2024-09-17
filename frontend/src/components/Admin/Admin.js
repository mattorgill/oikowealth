import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSessionContext } from '../../context/SessionContext'; 

function Admin() {
    const { users, fetchUsers, updateUserRole, resetUserPassword, sessionUser } = useSessionContext();
    const [editUserRole, setEditUserRole] = useState({});

    useEffect(() => {
        fetchUsers(); // Fetch users when the component mounts
    }, [fetchUsers]);

    const handleRoleChange = (userId, newRole) => {
        setEditUserRole(prevState => ({ ...prevState, [userId]: newRole }));
    };

    const handleSaveRole = (user) => {
        if (editUserRole[user._id]) {
            user.role = editUserRole[user._id]
            updateUserRole(user);
        }
    };

    const handleResetPassword = (userId) => {
        resetUserPassword(userId);
    };

    return (
        <AdminPageStyled>
            <h1>User Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        const canEditRole = () => {
                            if (!sessionUser || user._id === sessionUser._id) {
                                return false;
                            }
                            if (sessionUser.role === 'admin') {
                                return true;
                            } else if (sessionUser.role === 'manager' && user.role !== 'admin') {
                                return true;
                            } 
                            return false;
                        };
            
                        return (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {canEditRole() ? (
                                        <select
                                            value={editUserRole[user._id] || user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="manager">Manager</option>
                                            <option value="user">User</option>
                                        </select>
                                    ) : (
                                        <span>{user.role}</span>
                                    )}
                                </td>
                                <td>
                                    {canEditRole() && (
                                        <>
                                            <button onClick={() => handleSaveRole(user)}>Save Role</button>
                                            <button onClick={() => handleResetPassword(user._id)}>Reset Password</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </AdminPageStyled>
    );
}

export default Admin;

const AdminPageStyled = styled.div`
    padding: 20px;
    
    h1 {
        margin-bottom: 20px;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        
        th, td {
            padding: 10px;
            border: 1px solid #ccc;
            text-align: left;
        }
        
        th {
            background-color: #f4f4f4;
        }
        
        select {
            padding: 5px;
        }
        
        button {
            margin-right: 10px;
            padding: 5px 10px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            
            &:hover {
                background-color: #0056b3;
            }
        }
    }
`;
