import HttpStatus from 'http-status-codes'

import CartModel from 'models/Cart'
import dbConnect from 'utils/dbConnect'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'POST': {
      try {
        let doc = { products: [] }

        if (!req.body.products) {
          doc.products = req.body.products
        }

        const cart = await CartModel.create({ doc })

        res.status(HttpStatus.OK).json({
          message: 'Cart has been created successfully.',
          data: cart,
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
