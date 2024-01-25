import { manageMinecraftServer } from './module';

export const getMinecraftServerById = async (serverId: string) => {
  const servers = await manageMinecraftServer.getMinecraftServerById(serverId);
  return servers;
};

export const getMinecraftServerByName = async (serverName: string) => {
  const servers = await manageMinecraftServer.getMinecraftServerByName(serverName);
  return servers;
};