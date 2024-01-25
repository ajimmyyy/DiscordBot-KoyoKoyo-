import { ChildProcessWithoutNullStreams } from "child_process";

export interface MinecroftServer {
  id: string;
  serverName: string;
  version: string;
  prosess: ChildProcessWithoutNullStreams | null;
}