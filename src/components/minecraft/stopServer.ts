import { EmbedBuilder} from "discord.js";

export async function StopServerEmbed() {
  const embed = new EmbedBuilder()
    .setTitle("Server stopped")
    .setColor(0x808080)
    .setDescription("Close! ✅")
  return {
    embeds: [embed],
    components: [],
  }
}