import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "@/interfaces/Command";
import { getNoteData } from "@/api/manageNote/route";

export const searchNote: Command = {
  data: new SlashCommandBuilder()
    .setName("search_notes")
    .setDescription("get note list")
    .addIntegerOption((option) =>
      option
        .setName("day")
        .setDescription("The time range of note you want to search")
        .setRequired(false)
    ),
  run: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const { user } = interaction;
    const day = interaction.options.getInteger("day") || 7;
    const notes = await getNoteData(day);
    const fields = notes.map((note) => ({
      name: `${note.title}`,
      value: `${note.content}\n${note.timestamp}`,
      inline: false,
    }))

    const embed = new EmbedBuilder()
      .setTitle("Note")
      .setColor("#00ff00")
      .setDescription("note list")
      .addFields(fields)
      .setFooter({
        text:
          `Requested by ${user.tag}`
      })
      .setTimestamp();

    await interaction.editReply({
      embeds: [embed],
    });
  },
};