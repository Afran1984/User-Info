import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Dashbord = () => {
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    // Fetch user to server
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => {
                // map data
                const usersWithFileUrls = data.map(user => {
                    if (user.file) {
                        const blob = new Blob([user.file], { type: 'application/octet-stream' });
                        user.fileUrl = URL.createObjectURL(blob);
                    }
                    return user;
                });
                setUsers(usersWithFileUrls);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/user/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Delete Successfuly",
                    showConfirmButton: false,
                    timer: 1500
                  });
                setUsers(users.filter(user => user._id !== id));
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditClick = (user) => {
        setEditMode(user._id);
        setEditFormData(user);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log('Edit form data:', editFormData);
        try {
            const response = await fetch(`http://localhost:5000/user/${editMode}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Update Successfuly",
                    showConfirmButton: false,
                    timer: 1500
                  });
                setUsers(users.map(user => (user._id === editMode ? editFormData : user)));
                setEditMode(null);
            } else {
                const errorData = await response.json();
                console.error('Server error response:', errorData);
                alert(`Failed to update user: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error occurred while updating user');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">User Data</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Number</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Gender</th>
                        <th className="py-2 px-4 border-b">File</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            {editMode === user._id ? (
                                <>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleEditChange}
                                            className="input input-bordered w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="number"
                                            value={editFormData.number}
                                            onChange={handleEditChange}
                                            className="input input-bordered w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="email"
                                            name="email"
                                            value={editFormData.email}
                                            onChange={handleEditChange}
                                            className="input input-bordered w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="gender"
                                            value={editFormData.gender}
                                            onChange={handleEditChange}
                                            className="input input-bordered w-full"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={handleEditSubmit}
                                            className="btn btn-primary mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditMode(null)}
                                            className="btn btn-secondary"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.number}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.gender}</td>
                                    <td className="py-2 px-4 border-b">
                                        {user.fileUrl ? (
                                            user.file?.type?.startsWith('image/') ? (
                                                <img
                                                    src={user.fileUrl}
                                                    alt="Uploaded"
                                                    className="w-32 h-32 object-cover"
                                                />
                                            ) : (
                                                <a href={user.fileUrl} download>
                                                    Download File
                                                </a>
                                            )
                                        ) : (
                                            <span>No File</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="btn btn-info mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashbord;
