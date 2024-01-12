import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/Command";

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the bot's ping!"),
  run: async (interaction) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply(`Pong! Client: ${ping}ms | API: ${interaction.client.ws.ping}ms`);
  },
};