import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAccentClass } from './utilities/accentClasses';
import ButtonPrimary from "./buttons/ButtonPrimary";
import InputText from "./forms/InputText";

const Dashboard = ({ accentColor }) => {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`http://localhost:5000/wiki/entries?page=${page}&search=${searchTerm}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEntries(prevEntries => [...prevEntries, ...res.data.entries]);
                setHasMore(res.data.hasMore);
            } catch (err) {
                console.error('Error fetching entries:', err);
            }
        };
        fetchEntries();
    }, [page, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setEntries([]);
        setPage(1);
    };

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl mb-6">Your Wiki Entries</h1>
            <InputText placeholder="Search..." value={searchTerm} setValue={setSearchTerm} />
            <ButtonPrimary accentColor={accentColor} text="＋" onClick={() => navigate('/create')} />
            <div>
                {entries.map((entry) => (
                    <div key={entry.id} className="mb-4 p-4 rounded shadow">
                        <h2 className="text-xl">{entry.title}</h2>
                        <p>{entry.content}</p>
                        <p className={`${getAccentClass(accentColor, 'text')}`}>Tags: {entry.tags}</p>
                    </div>
                ))}
            </div>
            {hasMore && (
                <button
                    className={`mt-4 p-2 ${getAccentClass(accentColor, 'background')} text-white rounded transition`}
                    onClick={loadMore}
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default Dashboard;