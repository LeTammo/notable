import React, { useState } from 'react';
import axios from 'axios';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleCreateNote = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/wiki/create', {
                title,
                content,
                tags
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            window.location.href = '/dashboard';
        } catch (err) {
            console.error('Error creating note:', err);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-dark-bg text-dark-text">
            <form onSubmit={handleCreateNote} className="bg-dark-bg p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl mb-4">Create New Note</h1>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full mb-4 p-2 bg-dark-bg text-dark-text border border-dark-text rounded"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="block w-full mb-4 p-2 bg-dark-bg text-dark-text border border-dark-text rounded"
                />
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="block w-full mb-4 p-2 bg-dark-bg text-dark-text border border-dark-text rounded"
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-accent-green text-dark-bg rounded hover:bg-opacity-80 transition"
                >
                    Create Note
                </button>
            </form>
        </div>
    );
};

export default CreateNote;