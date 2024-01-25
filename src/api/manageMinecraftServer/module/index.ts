import prisma from "@/utils/prisma";

class ManageMinecraftServer {
  async getMinecraftServerById(serverId: string) {
    const servers = await prisma.minecraftServer.findMany({
      where: {
        serverId: serverId,
      },
    });

    return servers;
  };

  async getMinecraftServerByName(serverName: string) {
    const server = await prisma.minecraftServer.findFirst({
      where: {
        serverName: serverName,
      },
    });

    return server;
  };
}

export const manageMinecraftServer = new ManageMinecraftServer();