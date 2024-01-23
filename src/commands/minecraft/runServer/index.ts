import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, ComponentType } from "discord.js";
import { Command } from "@/interfaces/Command";
import { SearchServerEmbed } from "@/commands/minecraft/runServer/searchServer";
import { runningServerEmbed } from "./runingServer";
import { ErrorServerEmbed } from "./errrorServer";
const { spawn } = require('child_process');
const path = require('path');

const MAX_MEMORY = 3072;
const MIN_MEMORY = 1024;

async function startMinecraftServer(interaction: ChatInputCommandInteraction, serverName: string) {
  const jarFilePath = path.join(process.cwd(), `public/minecraftServer/${serverName}`);

  process.chdir(jarFilePath);
  const minecraftProcess = spawn('java', [`-Xmx${MAX_MEMORY}M`, `-Xms${MIN_MEMORY}M`, '-jar', 'server.jar', 'nogui']);
  minecraftProcess.stdout.on('data', (data: string) => {
    console.log(`stdout: ${data}`);
  });

  minecraftProcess.stderr.on('data', async (data: string) => {
    interaction.editReply(await ErrorServerEmbed(data));
  });

  minecraftProcess.on('close', (code: number) => {
    if (code === 0) {
      interaction.followUp("Minecraft server closed");
    } else {
      interaction.followUp(`Crash. Exit code: ${code}`);
    }
  });
}

export const minecraft: Command = {
  data: new SlashCommandBuilder()
    .setName("minecraft")
    .setDescription("start minecraft server"),
  run: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const { user } = interaction;

    const choose = await interaction.editReply(await SearchServerEmbed(interaction.guild?.id as string));

    const chooseCollector = choose.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 15000
    });

    chooseCollector.on('collect', async i => {
      await startMinecraftServer(interaction, i.values[0]);
      interaction.followUp(runningServerEmbed);
      await interaction.deleteReply();
    });
  }
};