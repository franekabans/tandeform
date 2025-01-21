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

        // Clear previous errors and messages
        setServerErrors({});
        setSuccessMessage('');
        setServerErrorMessage('');

        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const imageFile = imageRef.current.files[0];

        let isValid = true;

        // Client-side validation
        if (!firstName || !lastName || !imageFile) {
            if (!firstName) setServerErrors((prev) => ({ ...prev, first_name: 'First Name cannot be empty' }));
            if (!lastName) setServerErrors((prev) => ({ ...prev, last_name: 'Last Name cannot be empty' }));
            if (!imageFile) alert('Please upload an image');
            isValid = false;
        }

        if (isValid) {
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
                    // Success message
                    setSuccessMessage(response.data.message);

                    // Clear the form
                    firstNameRef.current.value = '';
                    lastNameRef.current.value = '';
                    imageRef.current.value = '';
                }
            } catch (error) {
                if (error.response) {
                    // Handle HTTP errors
                    if (error.response.status === 422) {
                        // Validation errors
                        setServerErrors(error.response.data.errors);
                    } else if (error.response.status >= 400 && error.response.status < 500) {
                        // Client-side errors (400-499)
                        setServerErrorMessage(`Client Error: ${error.response.status} - ${error.response.statusText}`);
                    } else if (error.response.status >= 500) {
                        // Server-side errors (500-599)
                        setServerErrorMessage(`Server Error: ${error.response.status} - ${error.response.statusText}`);
                    }
                } else if (error.request) {
                    // Network errors
                    setServerErrorMessage('Network error: Could not connect to the server. Please try again later.');
                } else {
                    // Other errors
                    setServerErrorMessage(`Unexpected error: ${error.message}`);
                }
            }
        }
    };

    return (
        <div id="app">
            <h1>Upload Image Page</h1>
            {successMessage && <div className="success">{successMessage}</div>}
            {serverErrorMessage && <div className="error">{serverErrorMessage}</div>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="first-name">First Name</label>
                <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    placeholder="Enter your first name"
                    ref={firstNameRef}
                />
                {serverErrors.first_name && <div className="error">{serverErrors.first_name}</div>}

                <label htmlFor="last-name">Last Name</label>
                <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    placeholder="Enter your last name"
                    ref={lastNameRef}
                />
                {serverErrors.last_name && <div className="error">{serverErrors.last_name}</div>}

                <label htmlFor="image-upload">Upload Image</label>
                <input
                    type="file"
                    id="image-upload"
                    name="image-upload"
                    ref={imageRef}
                />
                {serverErrors.image && <div className="error">{serverErrors.image}</div>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Upload;
