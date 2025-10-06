import { Interaction } from "discord.js";

import { Event, ExtendedClient } from "../../core";

class InteractionCreateEvent extends Event<"interactionCreate"> {
  name = "interactionCreate" as const;

  async execute(client: ExtendedClient, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      await command.execute(client, interaction);
    }

    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return;
      await button.execute(client, interaction);
    }

    if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if (!modal) return;
      await modal.execute(client, interaction);
    }

    if (interaction.isStringSelectMenu()) {
      const menu = client.selectMenus.get(interaction.customId);
      if (!menu) return;
      await menu.execute(client, interaction);
    }
  }
}

export default new InteractionCreateEvent();
