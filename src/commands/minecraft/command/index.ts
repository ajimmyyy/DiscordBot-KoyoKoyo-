import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "@/interfaces/Command";
import { minecraftServer } from "@/commands/minecraft/runServer";

export const commandMinecraft: Command = {
  data: new SlashCommandBuilder()
    .setName("minecraft_command")
    .setDescription("input minecraft command")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("command to run on server")
        .setRequired(true)
    ),
  run: async (interaction) => {
    await interaction.deferReply();

    if (!minecraftServer.prosess) {
      await interaction.editReply("Minecraft server is not running");
      return;
    }

    const { user } = interaction;
    const command = interaction.options.getString("command", true);
    let response = "";

    minecraftServer.prosess.stdin.write(`${command}`);
    minecraftServer.prosess.stdin.end();
    minecraftServer.prosess.stdout.on('data', (data) => {
      response += data.toString();
      const embed = new EmbedBuilder()
        .setTitle(`Command`)
        .setColor(0xffa500)
        .setDescription(`${response}`)
        .addFields([
          {
            name: "input",
            value: command,
            inline: true,
          },
        ])
        .setFooter({
          text: `Requested by ${user.tag}`
        })
        .setTimestamp();

      interaction.editReply({
        embeds: [embed],
      });
    });
  },
};