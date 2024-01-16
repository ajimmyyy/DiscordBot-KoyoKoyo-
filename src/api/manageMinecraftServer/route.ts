import { manageMinecraftServer } from './module';

export const getMinecraftServer = async (serverId: string) => {
  const servers = await manageMinecraftServer.getMinecraftServer(serverId);
  return servers;
};
