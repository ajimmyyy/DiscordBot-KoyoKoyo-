import exp from 'constants';
import { manageNote } from './module';

interface CreateNoteData {
  type?: string;
  title: string;
  content: string;
  serverId: string;
}

interface UpdateNoteData {
  id: string;
  type?: string;
  title?: string;
  content?: string;
  serverId: string;
}

export const getNoteData = async (day: number) => {
  const notes = await manageNote.getNoteData(day);
  return notes;
};

export const createNoteData = async ({type, title, content, serverId}: CreateNoteData) => {
  const noteData = await manageNote.createNoteData(type || "none", title, content, serverId);
  return noteData;
}

export const updateNoteData = async ({id, type, title, content, serverId}: UpdateNoteData) => {
  const noteData = await manageNote.updateNoteData(id, type, title, content, serverId);
  return noteData;
}