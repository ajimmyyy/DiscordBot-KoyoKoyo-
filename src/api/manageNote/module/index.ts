import prisma from "../../../utils/prisma";

class ManageNote {
  async getNoteData(id: string) {
    const camperData = await prisma.note.findFirst({
      where: {
        id: id,
      },
    });

    return camperData;
  };

  async createNoteData(type: string, title: string, content: string, serverId: string) {
    const noteData = await prisma.note.create({
      data: {
        type: type,
        title: title,
        content: content,
        server: {
          connect: { serverId: serverId },
        },
      },
    });

    return noteData;
  };

  async updateNoteData(id: string, type: string | undefined, title: string | undefined, content: string | undefined, serverId: string) {
    const noteData = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        type: type!,
        title: title!,
        content: content!,
        serverId: serverId,
      },
    });

    return noteData;
  };
}

export const manageNote = new ManageNote();