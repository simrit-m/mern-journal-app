const mongoose = require('mongoose');
const Journal = require('../model/journal');

// create journal
const createJournal = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();

    const newlyCreateJournal = new Journal({
        title, description, date: currentDate
    })

    try {
        await newlyCreateJournal.save()
    } catch (e) {
        console.log(e)
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreateJournal.save(session)
        session.commitTransaction()

    } catch (e) {
        return res.send(500).json({ message: e })
    }

    return res.status(200).json({ newlyCreateJournal })
};

// read journal
const getJournals = async (req, res) => {
    let journalList;
    try {
        journalList = await Journal.find();
    } catch (e) {
        console.log(e);
    }

    if (!journalList) {
        return res.status(404).json({ message: "No Journals" })
    }

    return res.status(200).json({ journalList })
};

// update journal
const editJournal = async (req, res) => {
    const id = req.params.id;

    const { title, description } = req.body
    let currentJournalToUpdate

    try {
        currentJournalToUpdate = await Journal.findByIdAndUpdate(id, {
            title, description
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" })
    }

    if (!currentJournalToUpdate) {
        return res.status(500).json({ message: "Unable to update" })
    }

    return res.status(200).json({ currentJournalToUpdate })
};

// delete journal
const deleteJournal = async (req, res) => {
    const id = req.params.id;

    try {
        const findCurrentJournal = await Journal.findByIdAndDelete(id);
        if (!findCurrentJournal) {
            return res.status(404).json({ message: "Journal not found" })
        }

        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (e) {
        console.log(e);
        returnres.status(500).json({ messsage: "Unable to delete" })
    }
};

module.exports = { getJournals, deleteJournal, editJournal, createJournal };