import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
