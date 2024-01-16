import prisma from "@/utils/prisma";

class ManageMinecraftServer {
  async getMinecraftServer(serverId: string) {
    const servers = await prisma.minecraftServer.findMany({
      where: {
        serverId: serverId,
      },
    });

    return servers;
  };
}

export const manageMinecraftServer = new ManageMinecraftServer();