import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  },
})

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema)
