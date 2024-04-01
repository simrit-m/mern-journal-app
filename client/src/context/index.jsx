import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const [journalList, setJournalList] = useState([]);
    const [pending, setPending] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    return <GlobalContext.Provider value={{ journalList, setJournalList, pending, setPending, formData, setFormData, isEdit, setIsEdit }}>{children}</GlobalContext.Provider>;
}