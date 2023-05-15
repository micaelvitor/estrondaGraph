import mongoose, { Document, Model } from 'mongoose';

export interface Boosting extends Document {
  userid: number;
  boosterName: string;
  originalMmr: string;
  goalMmr: string;
  finished: boolean;
  boosterId: number;
  created: string;
  update: string;
}

const boostingSchema = new mongoose.Schema<Boosting>({
  userid: { type: Number, required: true },
  boosterName: { type: String, required: true },
  originalMmr: { type: String, required: true },
  goalMmr: { type: String, required: true },
  finished: { type: Boolean, required: true },
  boosterId: { type: Number, required: true }
}, { timestamps: true });
  
const BoostingModel: Model<Boosting> = mongoose.model<Boosting>('Boosting', boostingSchema);

export default BoostingModel;
