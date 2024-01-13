import prisma from "../../../utils/prisma";

class ManageNote {
  async getNoteData(day: number) {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - day);

    const camperData = await prisma.note.findMany({
      where: {
        timestamp: {
          gte: startDate.toISOString(),
          lte: currentDate.toISOString(),
        },
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

    await this.CheckNoteNum(serverId);

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

  async deleteNoteData(id: string) {
    const noteData = await prisma.note.delete({
      where: {
        id: id,
      },
    });

    return noteData;
  };

  private async CheckNoteNum(serverId: string) {
    const notesCount = await prisma.note.count({
      where: {
        serverId: serverId,
      },
    });

    if (notesCount > 10) {
      const oldestNote = await prisma.note.findFirst({
        where: {
          serverId: serverId,
        },
        orderBy: {
          timestamp: 'asc',
        },
      });

      if (oldestNote) {
        await prisma.note.delete({
          where: {
            id: oldestNote.id,
          },
        });
      }
    }
  };
}

export const manageNote = new ManageNote();