import { Event, type ExtendedClient } from "../../core";

import { logger } from "../../utils/logger";

class ClientReadyEvent extends Event<"clientReady"> {
  name = "clientReady" as const;
  once = true;

  async execute(client: ExtendedClient): Promise<void> {
    logger.info(`Conectado como ${client.user?.tag}`);
  }
}

export default new ClientReadyEvent();
