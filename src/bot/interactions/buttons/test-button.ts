import { ButtonInteraction, MessageFlags } from "discord.js";

import { Button, ExtendedClient } from "../../../core";

class TestButton extends Button {
  customId = "test";

  async execute(client: ExtendedClient, interaction: ButtonInteraction) {
    await interaction.reply({
      content: "Botão de Teste clicado!",
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new TestButton();
