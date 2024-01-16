import { SlashCommandBuilder } from "@discordjs/builders";
import { ComponentType } from "discord.js";
import { Command } from "@/interfaces/Command";
const { exec } = require('child_process');

export const closeMinecraft: Command = {
  data: new SlashCommandBuilder()
    .setName("close_minecraft")
    .setDescription("close minecraft server"),
  run: async (interaction) => {
    await interaction.deferReply();
    const windowTitle = "Minecraft Server";
    const command = process.platform === 'win32'
      ? `taskkill /FI "WINDOWTITLE eq ${windowTitle}"`
      : `echo "Unsupported platform"`;

    exec(command, (err: any, stdout: any, stderr: any) => {
      if (err) {
        interaction.editReply(`Error: ${err}`);
        return;
      }

      console.log(stdout);
      console.log(stderr);

      interaction.editReply("Minecraft server window closed successfully.");
    });
  }
};
