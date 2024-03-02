import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "@/interfaces/Command";
import { GenerateContentRequest, GoogleGenerativeAI, ModelParams } from "@google/generative-ai";

const MODEL: ModelParams = {
    model: "gemini-pro",
};
const TOKEN = process.env.GOOGLE_API_TOKEN || "";

const ai = new GoogleGenerativeAI(TOKEN);
const model = ai.getGenerativeModel(MODEL);

export const chat: Command = {
    data: new SlashCommandBuilder()
      .setName("chat")
      .setDescription("start chat")
      .addStringOption((option) =>
        option
        .setName("content")
        .setDescription("content to start chat with")
        .setRequired(true)
      ),
      // .addAttachmentOption((option) =>
      //   option
      //   .setName("image")
      //   .setDescription("image if any")
      //   .setRequired(false)
      // ),
    run: async (interaction) => {
      await interaction.deferReply();
      const { user } = interaction;
      const content = interaction.options.getString("content", true);

      // const image = await interaction.options.getAttachment('image');
      // let base64Image = '';
      // if (image){
      //   const imageResponse = await fetch(image.url);
      //   const imageBlob = await imageResponse.blob();
      //   const imageBuffer = await imageBlob.arrayBuffer();
      //   base64Image = Buffer.from(imageBuffer).toString('base64');
      // }

      // const request: GenerateContentRequest = {
      //   contents: [
      //     {
      //       role: 'user',
      //       parts: [
      //         { text: content },
      //         { inlineData: { data: base64Image, mimeType: 'image/png' } }
      //       ]
      //     }
      //   ]
      // };

      // const { response } = await model.generateContentStream(request);

      const { response } = await model.generateContent(content);

      const embed = new EmbedBuilder()
      .setTitle("ChatKoyo")
      .setColor("#ff69b4")
      .setDescription(content)
      .addFields(
        {
          name: "KoyoBot:",
          value: await response.text(),
          inline: false
        }
      )
      .setFooter({
        text:
          `Requested by ${user.tag}`
      })
      .setTimestamp();

      await interaction.editReply({
        embeds: [embed],
      });
    }
  };