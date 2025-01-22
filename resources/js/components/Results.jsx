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
        return <div className="text-center">Loading images...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div id="Results">
            <h1 className="text-center mb-4">Uploaded Images</h1>
            <div className="row">
                {images.map((image) => (
                    <div key={image.id} className="col-md-6 mb-4">
                        <div className="card">
                            <img
                                src={`/storage/${image.image}`}
                                alt={`${image.first_name} ${image.last_name}`}
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <p className="card-text">
                                    {image.first_name} {image.last_name}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Results;
