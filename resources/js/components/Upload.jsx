import React, { useRef, useState } from 'react';
import axios from 'axios';

function Upload() {
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const imageRef = useRef(null);

    const [serverErrors, setServerErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [serverErrorMessage, setServerErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setServerErrors({});
        setSuccessMessage('');
        setServerErrorMessage('');

        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const imageFile = imageRef.current.files[0];

        if (!firstName || !lastName || !imageFile) {
            if (!firstName) setServerErrors((prev) => ({ ...prev, first_name: 'First Name is required' }));
            if (!lastName) setServerErrors((prev) => ({ ...prev, last_name: 'Last Name is required' }));
            if (!imageFile) alert('Please upload an image');
            return;
        }

        const data = new FormData();
        data.append('first_name', firstName);
        data.append('last_name', lastName);
        data.append('image', imageFile);

        try {
            const response = await axios.post('/api/upload-image', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                firstNameRef.current.value = '';
                lastNameRef.current.value = '';
                imageRef.current.value = '';
            }
        } catch (error) {
            setServerErrorMessage('Failed to upload. Please try again.');
        }
    };

    return (
        <div id="app">
            <h1 className="text-center mb-4">Upload Image</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {serverErrorMessage && <div className="alert alert-danger">{serverErrorMessage}</div>}

            <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow">
                <div className="mb-3">
                    <label htmlFor="first-name" className="form-label">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        className="form-control"
                        placeholder="Enter your first name"
                        ref={firstNameRef}
                    />
                    {serverErrors.first_name && <div className="text-danger">{serverErrors.first_name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="last-name" className="form-label">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        className="form-control"
                        placeholder="Enter your last name"
                        ref={lastNameRef}
                    />
                    {serverErrors.last_name && <div className="text-danger">{serverErrors.last_name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="image-upload" className="form-label">Upload Image</label>
                    <input
                        type="file"
                        id="image-upload"
                        name="image-upload"
                        className="form-control"
                        ref={imageRef}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
}

export default Upload;
