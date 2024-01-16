import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { Command } from "@/interfaces/Command";
import { CommandList } from "@/commands/_CommandList";

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Check in for the commands of koyokoyto bot"),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const fields = CommandList.map((command) => ({
      name: `${command.data.name}`,
      value: `Description:\n ${command.data.description}`,
      inline: false,
    }))

    const embed = new EmbedBuilder()
      .setTitle("こよこよ ボット")
      .setColor(0x18e1ee)
      .setDescription("Command List")
      .setFields(fields)
      .setFooter({
        text:
          "by ajimmyyy."
      });

    const cancelButton = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Icant')
      .setEmoji('🤏')
      .setStyle(ButtonStyle.Danger)

    const confirmButton = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Nice!')
      .setEmoji('😎')
      .setStyle(ButtonStyle.Success)
    
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(cancelButton, confirmButton);

    await interaction.editReply({
      embeds: [embed],
      components: [row],
    });
  }
};