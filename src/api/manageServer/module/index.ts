import prisma from "@/utils/prisma";

class ManageServer {
  async createServer(id: string, name: string) {
    const existingServer = await prisma.server.findFirst({
      where: {
        serverId: id,
      },
    });
  
    if (existingServer) {
      return existingServer;
    }

    const server = await prisma.server.create({
      data: {
        serverId: id,
        name: name,
      },
    });

    return server;
  };
}

export const manageServer = new ManageServer(); 