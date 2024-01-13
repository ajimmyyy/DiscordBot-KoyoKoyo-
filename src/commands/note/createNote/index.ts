import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "@/interfaces/Command";
import { createNoteData } from "@/api/manageNote/route";

export const createNote: Command = {
  data: new SlashCommandBuilder()
    .setName("note")
    .setDescription("Create a note")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The type of note")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The title of note")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message you want to log")
        .setRequired(true)
    ),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const type = interaction.options.getString("type", true);
    const title = interaction.options.getString("title", true);
    const content = interaction.options.getString("message", true);

    const note = await createNoteData({ type, title, content, serverId: interaction.guildId! });

    const embed = new EmbedBuilder()
      .setTitle(`Note created`)
      .setColor(0x18e1ee)
      .setDescription(`Note created with id: ${note.id}`)
      .addFields([
        {
          name: "Type",
          value: note.type,
          inline: true,
        },
        {
          name: "Title",
          value: note.title,
          inline: true,
        },
        {
          name: "Content",
          value: note.content,
        },
      ])
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