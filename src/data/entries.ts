import mongoose = require('./db');

//var Schema = <Function>mongoose.Schema;

var entrySchema = new mongoose.Schema({
    name: String,
    message: String
});

export var Entry = mongoose.model<IEntryModel>("Entry", entrySchema);

export function save(obj: IEntry, callback?: (entry: IEntryModel) => void) {
    let entry = new Entry(obj);
    entry.save((err, entry: IEntryModel) => {
        if (callback) callback(entry);
    });
}

export function all(callback: (entries: IEntryModel[]) => void) {
    Entry.find(function(err: Error, entries: IEntryModel[]) {
        callback(entries);
    });
}

export function findEntries(obj: IEntry, callback: Function) {
    Entry.find(obj).lean().exec((err, entries: Array<IEntry>) => {
        callback(entries);
    });
}

export function findEntryById(id: string, callback: Function) {
    Entry.findById(id, (err, entry: IEntryModel) => {
        if(callback) callback(entry);
    })
}

export function deleteEntryById(id: string, callback?: (entry: IEntryModel) => void) {
    Entry.findById(id, (err, entry: IEntryModel) => {
        entry.remove();
        if(callback) callback(entry);
    })
}

export interface IEntry {
    name: string;
    message: string;
}

export interface IEntryModel extends IEntry, mongoose.Document{}