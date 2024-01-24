import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "@/interfaces/Command";
import { stopMinecraftServer } from "@/commands/minecraft/runServer/index";
import { StopServerEmbed } from "@/components/minecraft/stopServer";

export const closeMinecraft: Command = {
  data: new SlashCommandBuilder()
    .setName("close_minecraft")
    .setDescription("close minecraft server"),
  run: async (interaction) => {
    await interaction.deferReply();
    await stopMinecraftServer();
    interaction.editReply(await StopServerEmbed());
  }
};
