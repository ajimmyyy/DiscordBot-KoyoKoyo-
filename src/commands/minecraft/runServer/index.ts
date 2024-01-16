import { SlashCommandBuilder } from "@discordjs/builders";
import { ComponentType } from "discord.js";
import { Command } from "@/interfaces/Command";
import { SearchServerEmbed } from "@/commands/minecraft/runServer/searchServer";
import { loadingServerEmbed } from "@/commands/minecraft/runServer/loadingServer";
import { runningServerEmbed } from "./runingServer";
import { ErrorServerEmbed } from "./errrorServer";
const { spawn } = require('child_process');
const path = require('path');

export const minecraft: Command = {
  data: new SlashCommandBuilder()
    .setName("minecraft")
    .setDescription("start minecraft server"),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;

    const choose = await interaction.editReply(await SearchServerEmbed(interaction.guild?.id as string));

    const chooseCollector = choose.createMessageComponentCollector({ 
      componentType: ComponentType.StringSelect, 
      time: 15000 
    });

    chooseCollector.on('collect', async i => {
      const reply = await interaction.editReply(loadingServerEmbed);
      const currentDirectory = __dirname; 
      const jarFilePath = path.join(process.cwd(), `public/minecraftServer/${i.values[0]}`);

      process.chdir(jarFilePath);
      const minecraftProcess = spawn('java', ['-Xmx1024M', '-Xms1024M', '-jar', 'server.jar', 'nogui']);

      minecraftProcess.stdout.on('data', (data: any) => {
        console.log(`stdout: ${data}`);
      });

      minecraftProcess.stderr.on('data', async (data: string) => {
        interaction.editReply(await ErrorServerEmbed(data));
      });

      interaction.editReply(runningServerEmbed);

      minecraftProcess.on('close', (code: number) => {
        if (code === 0) {
          interaction.followUp("Minecraft server closed");
        } else {
          interaction.followUp(`Crash. Exit code: ${code}`);
        }
      });
    });
  }
};