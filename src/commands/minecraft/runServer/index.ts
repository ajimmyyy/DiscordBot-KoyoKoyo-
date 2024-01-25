import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, ComponentType } from "discord.js";
import { Command } from "@/interfaces/Command";
import { SearchServerEmbed } from "@/components/minecraft/searchServer";
import { runningServerEmbed } from "@/components/minecraft/runningServer";
import { ErrorServerEmbed } from "@/components/minecraft/errrorServer";
import { StopServerEmbed } from "@/components/minecraft/stopServer";
import { ChildProcessWithoutNullStreams } from "child_process";
const { spawn } = require('child_process');
const treeKill = require('tree-kill');
const path = require('path');

const MAX_MEMORY = 3072;
const MIN_MEMORY = 1024;
let minecraftProcess: ChildProcessWithoutNullStreams | null = null;
let originalDirectory: string;

async function startMinecraftServer(interaction: ChatInputCommandInteraction, serverName: string): Promise<number> {
  originalDirectory = process.cwd();
  const jarFilePath = path.join(process.cwd(), `public/minecraftServer/${serverName}`);

  return new Promise((resolve) => {
    process.chdir(jarFilePath);
    minecraftProcess = spawn('java', [`-Xmx${MAX_MEMORY}M`, `-Xms${MIN_MEMORY}M`, '-jar', 'server.jar', 'nogui']);

    minecraftProcess?.stdout.on('data', (data: string) => {
      console.log(`stdout: ${data}`);
      if (data.includes('Done')) {
        process.chdir(originalDirectory);
        resolve(200);
      }
    });

    minecraftProcess?.stderr.on('data', async (data: string) => {
      interaction.editReply(await ErrorServerEmbed(data));
      resolve(500);
    });

    minecraftProcess?.on('close', (code: number) => {
      if (code === 0) {
        interaction.followUp("Minecraft server closed");
      } else {
        interaction.followUp(`Crash. Exit code: ${code}`);
      }
      resolve(code);
    });
  });
}

export async function stopMinecraftServer(): Promise<number> {
  console.log("Stopping Minecraft server...");
  if (minecraftProcess) {
    return new Promise<number>((resolve) => {
      treeKill(minecraftProcess?.pid, 'SIGTERM', (err: any) => {
        if (err) {
          console.error('Something went wrong', err);
          resolve(500);
        }
        else {
          console.log("Minecraft server closed");
          minecraftProcess = null;
          resolve(200);
        }
      });
    });
  } else {
    console.log("Minecraft server doesn't exist");
    return 200;
  }
}

export const minecraft: Command = {
  data: new SlashCommandBuilder()
    .setName("minecraft")
    .setDescription("start minecraft server"),
  run: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    if (minecraftProcess) {
      await interaction.editReply(await runningServerEmbed);
      return;
    }

    const { user } = interaction;
    const choose = await interaction.editReply(await SearchServerEmbed(interaction.guild?.id as string));
    const chooseCollector = choose.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 15000
    });

    chooseCollector.on('collect', async i => {
      const code = await startMinecraftServer(interaction, i.values[0]);
      chooseCollector?.stop();
      if (code === 200) {
        const close = await interaction.followUp(runningServerEmbed);
        await interaction.deleteReply();

        const closeCollector = close.createMessageComponentCollector({
          componentType: ComponentType.Button,
        });

        closeCollector.on('collect', async i => {
          if (i.customId === "close") {
            const stopCode =  await stopMinecraftServer();
            if (stopCode === 200) {
              await i.update(await StopServerEmbed());
            }
          }
        });
      }
    });
  }
};