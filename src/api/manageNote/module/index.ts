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
}

export const manageNote = new ManageNote();