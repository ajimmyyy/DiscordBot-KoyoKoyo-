import { Command } from "@/interfaces/Command";
import { ping } from "./basic/ping";
import { botInfo } from "./basic/info";
import { help } from "./basic/help";
import { createNote } from "./note/createNote";
import { searchNote } from "./note/searchNote";
import { minecraft } from "./minecraft/runServer";
import { closeMinecraft } from "./minecraft/closeServer";
import { commandMinecraft } from "./minecraft/command";

export const CommandList: Command[] = [ping, botInfo, help, createNote, searchNote, minecraft, closeMinecraft, commandMinecraft];
