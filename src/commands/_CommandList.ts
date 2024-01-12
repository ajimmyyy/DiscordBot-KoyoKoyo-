import { Command } from "../interfaces/Command";
import { ping } from "./ping";
import { botInfo } from "./info";
import { help } from "./help";

export const CommandList: Command[] = [ping, botInfo, help];
