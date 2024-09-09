import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useResolveAccentColor from "../hooks/useResolveAccentColor";
import ButtonPrimary from "./buttons/ButtonPrimary";
import InputText from "./forms/InputText";

const Dashboard = () => {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const backgroundColor = useResolveAccentColor('background');
    const textColor = useResolveAccentColor('text');

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
        <div className="p-6 flex flex-row gap-20">
            <div>
                <InputText placeholder="Search..." value={searchTerm} setValue={setSearchTerm} />
                <ButtonPrimary text="＋" onClick={() => navigate('/create')} />
            </div>
            <div>
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <div>{entry.title}</div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <button
                    className={`mt-4 p-2 ${backgroundColor} text-white rounded transition`}
                    onClick={loadMore}
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default Dashboard;