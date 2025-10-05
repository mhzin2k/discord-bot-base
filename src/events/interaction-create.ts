import { Interaction } from "discord.js";

import { Event, ExtendedClient } from "../core";

class InteractionCreateEvent extends Event<"interactionCreate"> {
  name = "interactionCreate" as const;

  async execute(client: ExtendedClient, interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    await command.execute(client, interaction);
  }
}

export default new InteractionCreateEvent();
