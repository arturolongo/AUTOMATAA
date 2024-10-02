// FileUpload.js (Frontend - React)

import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [results, setResults] = useState({ valid_codes: [], invalid_codes: [] });
    const [error, setError] = useState('');

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/cargar-archivo/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResults(response.data);
            setError('');
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
            setError('Error al cargar el archivo.');
            setResults({ valid_codes: [], invalid_codes: [] });
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            uploadFile(files[0]);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="container">
            <h1>GS1-128</h1>
            <div
                className="drop-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                Arrastra tu archivo .txt aquí
            </div>
            {error && <p className="error">{error}</p>}
            <div className="results">
                <h2>Códigos Válidos</h2>
                <ul>
                    {results.valid_codes.map((code, index) => (
                        <li key={index} className="valid">{code}</li>
                    ))}
                </ul>
                <h2>Códigos Inválidos</h2>
                <ul>
                    {results.invalid_codes.map((item, index) => (
                        <li key={index} className="invalid">{item.code} - {item.error}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FileUpload;
