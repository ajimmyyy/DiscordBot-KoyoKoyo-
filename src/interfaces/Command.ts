import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";
import { CommandInteraction, ChatInputCommandInteraction} from "discord.js";

export interface Command {
  data:
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
  run: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
