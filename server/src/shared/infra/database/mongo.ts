import mongoose, { Schema } from 'mongoose';

const clientSchema: Schema = new Schema({
  _id: { type: mongoose.Types.UUID, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: Number, required: true },
  agent: { type: Schema.Types.UUID, ref: 'Agent' }
});

const agentSchema: Schema = new Schema({
  _id: { type: mongoose.Types.UUID, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: Number, required: true },
});

// Create mongoose models
const ClientModel = mongoose.model('Client', clientSchema);
const AgentModel = mongoose.model('Agent', agentSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || "", {
  autoIndex: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

export { ClientModel, AgentModel };