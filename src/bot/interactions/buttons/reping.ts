import { ButtonInteraction, MessageFlags } from "discord.js";

import { Button, ExtendedClient } from "../../../core";

class RepingButton extends Button {
  customId = "reping";

  async execute(client: ExtendedClient, interaction: ButtonInteraction) {
    await interaction.reply({
      content: `Pong! Latência: ${client.ws.ping}ms`,
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new RepingButton();
