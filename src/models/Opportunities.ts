import { Schema, model, Document } from 'mongoose'

interface OpportunitiesInterface extends Document {
  dealValue?: number
  date?: any
}

const OpportunitiesSchema = new Schema({
  dealValue: Number,
  date: {
    type: String,
    default: new Date().toLocaleDateString('en-CA')}
}, {
  timestamps: true
})

export default model<OpportunitiesInterface>('Opportunities', OpportunitiesSchema)
