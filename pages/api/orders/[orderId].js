import HttpStatus from 'http-status-codes'

import OrderModel from 'models/Order'
import dbConnect from 'utils/dbConnect'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET': {
      try {
        const order = await OrderModel.findById(req.query.orderId)

        res.status(HttpStatus.OK).json({
          message: 'Order has been retrived successfully.',
          data: order,
        })
      } catch (err) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: err.message,
          code: err.code ?? 'UNPROCESSABLE_ENTITY',
        })
      }
      break
    }

    case 'PATCH': {
      try {
        const update = {
          cartId: req.body.cartId,
        }

        const order = await OrderModel.findByIdAndUpdate(
          req.query.orderId,
          update,
          { new: true }
        )

        res.status(HttpStatus.OK).json({
          message: 'Order has been updated successfully.',
          data: order,
        })
      } catch (err) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: err.message,
          code: err.code ?? 'UNPROCESSABLE_ENTITY',
        })
      }
      break
    }

    default: {
      res.setHeader('Allow', ['GET'])
      res
        .status(HttpStatus.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`)
    }
  }
}
