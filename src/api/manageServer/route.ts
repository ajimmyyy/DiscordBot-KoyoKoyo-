import { manageServer } from './module';

interface CreateServerData {
  id: string;
  name: string;
}

export const createServerData = async ({ id, name }: CreateServerData) => {
  const server = await manageServer.createServer(id, name);
  return server;
}