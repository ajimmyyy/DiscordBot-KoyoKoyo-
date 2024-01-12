import zod from 'zod';
import { manageNote } from './module';

const GetNoteRequestBody = zod.object({
  id: zod.string(),
});

export const getNoteData = async (id: string) => {
  const parsed  = GetNoteRequestBody.parse({ id });
  const noteData = await manageNote.getNoteData(parsed.id);
  return noteData;
};