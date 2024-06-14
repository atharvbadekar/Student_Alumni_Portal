import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState('students');
    const [searchYear, setSearchYear] = useState('');

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUsers(data);
                filterUsers(data, filter);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        filterUsers(users, filter);
    }, [filter, users]);

    useEffect(() => {
        filterUsersByYear(users, searchYear);
    }, [searchYear, users]);

    const filterUsers = (users, filter) => {
        const filtered = users.filter(user => {
            if (filter === 'students') {
                return user.yearOfPassOut >= 2024;
            } else {
                return user.yearOfPassOut < 2024;
            }
        });
        setFilteredUsers(filtered);
    };

    const filterUsersByYear = (users, year) => {
        const filtered = users.filter(user => {
            return user.yearOfPassOut && user.yearOfPassOut.toString().includes(year);
        });
        setFilteredUsers(filtered);
    };

    const deleteUser = (id) => {
        fetch(`/api/users/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => {
                const updatedUsers = users.filter(user => user._id !== id);
                setUsers(updatedUsers);
                filterUsers(updatedUsers, filter);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <nav className="nav-bar">
                <button
                    className={`nav-button ${filter === 'students' ? 'active' : ''}`}
                    onClick={() => setFilter('students')}
                >
                    Students
                </button>
                <button
                    className={`nav-button ${filter === 'alumni' ? 'active' : ''}`}
                    onClick={() => setFilter('alumni')}
                >
                    Alumni
                </button>
            </nav>
            <div className="user-count">
                Total Users: {filteredUsers.length}
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by year"
                    value={searchYear}
                    onChange={(e) => setSearchYear(e.target.value)}
                />
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Year of Passout</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.yearOfPassOut}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
