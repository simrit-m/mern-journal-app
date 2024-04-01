import { useContext, useEffect } from 'react';
import classes from './styles.module.css';
import { GlobalContext } from '../../context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'

export default function AddJournal() {
    const { formData, setFormData, isEdit, setIsEdit } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    async function handleSaveToDatabase() {
        const response = isEdit ? await axios.put(`http://localhost:8000/api/journals/update/${location.state.getCurrentJournalItem._id}`, { title: formData.title, description: formData.description }) :
            await axios.post('http://localhost:8000/api/journals/add', {
                title: formData.title,
                description: formData.description
            })

        const result = await response.data;

        if (result) {
            setIsEdit(false);
            setFormData({
                title: "",
                description: "",
            });
            navigate("/");
        }
    }

    useEffect(() => {
        console.log(location);
        if (location.state) {
            const { getCurrentJournalItem } = location.state;
            setIsEdit(true);
            setFormData({
                title: getCurrentJournalItem.title,
                description: getCurrentJournalItem.description
            })
        }
    }, [location])

    return (
        <div className={classes.wrapper}>
            <h1> {isEdit ? 'Edit a Journal' : 'Add a Journal'} </h1>
            <div className={classes.formWrapper}>
                <input
                    name='title'
                    placeholder='Enter Journal Title'
                    id='title'
                    type='text'
                    value={formData.title}
                    onChange={(e) => setFormData({
                        ...formData,
                        title: e.target.value
                    })}
                />
                <textarea
                    name='description'
                    placeholder='Enter Journal Description'
                    id='description'
                    value={formData.description}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            description: event.target.value
                        })
                    }
                />
                <button onClick={handleSaveToDatabase}>{isEdit ? 'Edit Journal' : 'Add Journal'}</button>
            </div>
        </div>
    );
}