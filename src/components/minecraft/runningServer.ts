import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { MinecroftServer } from "@/interfaces/MinecraftServer";

export async function RunningServerEmbed(server: MinecroftServer) {


  const embed = new EmbedBuilder()
    .setTitle(`runing server: ${server.serverName}`)
    .setColor(0x228b22)
    .setDescription("Success! ✅")
    .addFields(
      { name: "Version", value: server.version },
      { name: "IP", value: "ajimmyyy.ddns.net:25565" },
      { name: "Port", value: "25565" },
    )

  const closeButton = new ButtonBuilder()
      .setCustomId('close')
      .setLabel('Close')
      .setEmoji('✖️')
      .setStyle(ButtonStyle.Danger)

  const row = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(closeButton);

  return {
    embeds: [embed],
    components: [row],
  }
}