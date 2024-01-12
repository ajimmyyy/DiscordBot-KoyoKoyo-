import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../../interfaces/Command";

export const botInfo: Command = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Check in for the information of koyokoyo bot!"),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;

    const infoEmbed = new EmbedBuilder()
      .setTitle("こよこよ ボット")
      .setDescription("This is KoyoKoyo bot!")
      .setDescription("Please use /help for more information!")
      .setFields([
        {
          name: "Version",
          value: "v1.0.0",
        },
        {
          name: "Github",
          value: "https://github.com/ajimmyyy",
        },
      ])
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL(),
      })
      .setFooter({
        text:
          "by ajimmyyy."
      });

    await interaction.editReply({ embeds: [infoEmbed] });
  },
};