import express from 'express'
import { Controller } from './controller';

const agentRouter = express.Router();
const controller = new Controller();

agentRouter.get('/',
  (req, res) => controller.getAll(req, res)
);

agentRouter.post('/',
  (req, res) => controller.create(req, res)
)

agentRouter.get('/:id',
  (req, res) => controller.get(req, res)
)

export { agentRouter };