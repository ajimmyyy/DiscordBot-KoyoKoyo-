import { EmbedBuilder} from "discord.js";

const embed = new EmbedBuilder()
  .setTitle("opening minecraft server")
  .setColor(0x228b22)
  .setDescription("loading...")

export const loadingServerEmbed = {
  embeds: [embed],
  components: [],
}