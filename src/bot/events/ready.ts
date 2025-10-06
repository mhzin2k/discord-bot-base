import { REST, Routes } from "discord.js";

import { Event, ExtendedClient } from "../../core";

import { logger } from "../../utils/logger";

class ClientReadyEvent extends Event<"clientReady"> {
  name = "clientReady" as const;
  once = true;

  async execute(client: ExtendedClient): Promise<void> {
    try {
      logger.info("[*] Registrando comandos via REST...");

      const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

      if (client.commands.size === 0) {
        logger.warn("[!] Nenhum comando carregado para registrar");
      } else {
        const body = client.commands.map((cmd) => cmd.data.toJSON());
        await rest.put(Routes.applicationCommands(client.user!.id), { body });
        logger.info(`[+] Comandos registrados: ${client.commands.size}`);
      }
    } catch (error: any) {
      logger.error("[!] Erro ao registrar comandos:", error);
    }

    logger.info(`[+] Conectado como ${client.user?.tag}`);
  }
}

export default new ClientReadyEvent();
