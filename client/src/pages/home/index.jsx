import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const { journalList, setJournalList, pending, setPending } = useContext(GlobalContext);

    async function getJournals() {
        setPending(true);
        const response = await axios.get('http://localhost:8000/api/journals');
        const result = await response.data;

        if (result && result.journalList && result.journalList.length) {
            setJournalList(result.journalList);
            setPending(false);
        } else {
            setPending(false);
            setJournalList([]);
        }
    }

    async function handleDeleteJournal(getCurrentId) {
        const response = await axios.delete(`http://localhost:8000/api/journals/delete/${getCurrentId}`);
        const result = await response.data;

        if (result?.message) {
            getJournals();
        }
    }

    function handleEdit(getCurrentJournalItem) {
        navigate('/add-journal', { state: { getCurrentJournalItem } });

    }

    useEffect(() => {
        getJournals();
    }, []);

    return (
        <div className={classes.wrapper}>
            <h1>Previous Journals</h1>
            {pending ? (<h1>Loading List of Journals</h1>) : (
                <div className={classes.journalList}>
                    {journalList && journalList.length ? (
                        journalList.map((journalItem) => (
                            <div key={journalItem._id}>
                                <p>{journalItem.title}</p>
                                <p>{journalItem.description}</p>
                                <FaEdit onClick={() => handleEdit(journalItem)} size={30} />
                                <FaTrash onClick={() => handleDeleteJournal(journalItem._id)} size={30} />
                            </div>
                        ))
                    ) : (<h3>No Journals Added</h3>
                    )}
                </div>
            )}
        </div>
    );
}