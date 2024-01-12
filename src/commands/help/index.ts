import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import { Command } from "../../interfaces/Command";
import { CommandList } from "../_CommandList";

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Check in for the commands of koyokoyto bot"),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const fields = CommandList.map((command) => ({
      name: command.data.name,
      value: `Description:\n ${command.data.description}`,
      inline: false,
    }))

    const infoEmbed = new EmbedBuilder()
      .setTitle("こよこよ ボット")
      .setDescription("Command List")
      .setFields(fields)
      .setFooter({
        text:
          "by ajimmyyy."
      });

    await interaction.editReply({ embeds: [infoEmbed] });
  }
};