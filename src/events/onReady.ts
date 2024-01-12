import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import { CommandList } from "../commands/_CommandList";

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
  });

  console.log("Discord ready!");
};