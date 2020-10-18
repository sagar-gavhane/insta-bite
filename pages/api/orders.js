import HttpStatus from 'http-status-codes'

import OrderModel from 'models/Order'
import dbConnect from 'utils/dbConnect'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'POST': {
      try {
        let doc = { cartId: req.body.cartId }

        const order = await OrderModel.create(doc)

        res.status(HttpStatus.OK).json({
          message: 'Order has been created successfully.',
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
      res.setHeader('Allow', ['POST'])
      res
        .status(HttpStatus.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`)
    }
  }
}
