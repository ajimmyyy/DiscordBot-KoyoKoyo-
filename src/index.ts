import 'module-alias/register';
import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { validateEnv } from "./utils/validateEnv";
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";

(async () => {
  if (!validateEnv()) return;

  const BOT = new Client({ intents: IntentOptions });

  BOT.on("ready", async () => await onReady(BOT));

  await BOT.login(process.env.BOT_TOKEN);

  BOT.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
  );

})();
