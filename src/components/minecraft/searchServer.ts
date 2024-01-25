import { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "discord.js";
import { getMinecraftServer } from "@/api/manageMinecraftServer/route";

export async function SearchServerEmbed(serverId: string) {
  const serverData = await getMinecraftServer(serverId);

  if (serverData.length === 0) {
    return {
      content: "no server",
    }
  }

  const embed = new EmbedBuilder()
    .setTitle("select minecraft server")
    .setColor(0x228b22)
    .setDescription("choose one server")

  const cancelButton = new StringSelectMenuBuilder()
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
    .addComponents(cancelButton);

  return{
    embeds: [embed],
    components: [row],
  }
}
