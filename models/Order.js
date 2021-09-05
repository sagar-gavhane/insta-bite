import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
