import { Command } from "../interfaces/Command";
import { ping } from "./ping";
import { botInfo } from "./info";
import { help } from "./help";
import { note } from "./note";

export const CommandList: Command[] = [ping, botInfo, help, note];
