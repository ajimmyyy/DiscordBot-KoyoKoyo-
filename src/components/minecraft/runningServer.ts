import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

const embed = new EmbedBuilder()
  .setTitle("runing minecraft server")
  .setColor(0x228b22)
  .setDescription("Success! ✅")
  .addFields(
    { name: "IP", value: "26.73.49.72" },
    { name: "Port", value: "25565" },
  )

const closeButton = new ButtonBuilder()
    .setCustomId('close')
    .setLabel('Close')
    .setEmoji('✖️')
    .setStyle(ButtonStyle.Danger)

const row = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(closeButton);

export const runningServerEmbed = {
  embeds: [embed],
  components: [row],
}