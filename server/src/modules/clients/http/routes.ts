import express from 'express'
import { Controller } from './controller';

const clientRouter = express.Router();
const controller = new Controller();

clientRouter.get('/',
  (req, res) => controller.getAll(req, res)
);

clientRouter.post('/',
  (req, res) => controller.create(req, res)
)

clientRouter.delete('/:id',
  (req, res) => controller.delete(req, res)
)

clientRouter.put('/:id',
  (req, res) => controller.update(req, res)
)

export { clientRouter };