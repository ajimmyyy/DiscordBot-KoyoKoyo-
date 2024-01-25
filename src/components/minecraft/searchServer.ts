import { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "discord.js";
import { getMinecraftServerById } from "@/api/manageMinecraftServer/route";

export async function SearchServerEmbed(serverId: string) {
  const serverData = await getMinecraftServerById(serverId);

  if (serverData.length === 0) {
    return {
      content: "no server",
    }
  }

  const embed = new EmbedBuilder()
    .setTitle("select minecraft server")
    .setColor(0x228b22)
    .setDescription("choose one server")

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('sever list')
    .setPlaceholder('None')
    .addOptions(
      serverData.map((server) => {
        return new StringSelectMenuOptionBuilder()
          .setLabel(server.serverName)
          .setValue(server.serverName)
      }
    )
  )

  const row = new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(selectMenu);

  return{
    embeds: [embed],
    components: [row],
  }
}
