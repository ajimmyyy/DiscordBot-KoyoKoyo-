import { EmbedBuilder} from "discord.js";

const embed = new EmbedBuilder()
  .setTitle("runing minecraft server")
  .setColor(0x228b22)
  .setDescription("Success! ✅")
  .addFields(
    { name: "IP", value: "26.73.49.72" },
    { name: "Port", value: "25565" },
  )

export const runningServerEmbed = {
  embeds: [embed],
  components: [],
}