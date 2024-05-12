import express from 'express'
import { clientRouter } from '../../../../modules/clients/http/routes';
import { agentRouter } from '../../../../modules/agents/http/routes';

const v1Router = express.Router();

v1Router.use('/clients', clientRouter);
v1Router.use('/agents', agentRouter)

export { v1Router }