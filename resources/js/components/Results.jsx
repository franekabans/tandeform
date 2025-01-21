import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Results() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('/api/results');
                setImages(response.data.images);
                setLoading(false);
            } catch (error) {
                setError('Failed to load images. Please try again.');
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return <div>Loading images...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div id="Results">
            <h1>Uploaded Images</h1>
            <div className="image-grid">
                {images.map((image) => (
                    <div key={image.id} className="image-item">
                        <img
                            src={`/storage/${image.image}`} // Assuming image path is correct
                            alt={`${image.first_name} ${image.last_name}`}
                            className="image"
                        />
                        <p>{image.first_name} {image.last_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Results;
