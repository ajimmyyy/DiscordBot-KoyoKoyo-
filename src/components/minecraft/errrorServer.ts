import { EmbedBuilder} from "discord.js";

export async function ErrorServerEmbed(error: string) {
  const embed = new EmbedBuilder()
    .setTitle("Some thing went wrong")
    .setColor(0xdc143c)
    .setDescription(error)
  return {
    embeds: [embed],
    components: [],
  }
}