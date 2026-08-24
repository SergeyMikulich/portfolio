import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleWorkMetadataRequest } from '../server/work-meta';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await handleWorkMetadataRequest(req, res);
}
