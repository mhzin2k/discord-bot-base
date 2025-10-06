import { MessageFlags, ModalSubmitInteraction } from "discord.js";

import { ExtendedClient, Modal } from "../../../core";

class TestModal extends Modal {
  customId = "test-modal";

  async execute(client: ExtendedClient, interaction: ModalSubmitInteraction) {
    const inputValue = interaction.fields.getTextInputValue("testInput");
    await interaction.reply({
      content: `Você enviou: ${inputValue}`,
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new TestModal();
