import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import { CommandList } from "@/commands/_CommandList";
import { createServerData } from "@/api/manageServer/route";

export const onReady = async (BOT: Client) => {
  const rest = new REST().setToken(
    process.env.BOT_TOKEN as string
  );

  const commandData = CommandList.map((command) => command.data.toJSON());

  const guilds = BOT.guilds.cache;

  guilds.forEach(async (guild) => {
    await rest.put(
      Routes.applicationGuildCommands(
        BOT.user?.id || "missing id",
        guild.id
      ),
      { body: commandData }
    );

    const server = await createServerData({
      id: guild.id,
      name: guild.name,
    });
  });

  console.log("Discord ready!");
};