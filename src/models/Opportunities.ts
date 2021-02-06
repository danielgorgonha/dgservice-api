import mongoose, { model } from 'mongoose'

const OpportunitiesSchema = new mongoose.Schema({
  valor_total: Number
}, {
  timestamps: true
})

export default model('Opportunities', OpportunitiesSchema)
