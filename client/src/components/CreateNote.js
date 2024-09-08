import React, { useState } from 'react';
import axios from 'axios';
import InputText from "./forms/InputText";
import InputTextarea from "./forms/InputTextarea";
import FormSubmit from "./buttons/ButtonSecondary";

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
        <div>
            <form onSubmit={handleCreateNote}>
                <h1 className="text-2xl mb-4">Draft of 'new notable'</h1>
                <InputText placeholder="Title" value={title} setValue={setTitle} required />
                <InputTextarea placeholder="Content" value={content} setValue={setContent} required />
                <InputText placeholder="Tags (comma separated)" value={tags} setValue={setTags} />
                <FormSubmit text="Add" />
            </form>
        </div>
    );
};

export default CreateNote;