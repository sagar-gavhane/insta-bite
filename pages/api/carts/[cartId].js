import HttpStatus from 'http-status-codes'

import CartModel from 'models/Cart'
import dbConnect from 'utils/dbConnect'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET': {
      try {
        const cart = await CartModel.findById(req.query.cartId)

        res.status(HttpStatus.OK).json({
          message: 'Cart has been retrived successfully.',
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

    case 'PATCH': {
      try {
        // todo: patch without overriding existing docs
        // const cart = await CartModel.findById(req.query.cartId)

        const update = {
          products: req.body.products,
        }

        // if (req.body.products) {
        //   if (cart.products.length > 0) {
        //     update.products = cart.products.concat(req.body.products)
        //   } else {
        //     update.products = req.body.products
        //   }
        // }

        const nextCart = await CartModel.findByIdAndUpdate(
          req.query.cartId,
          update,
          { new: true }
        )

        res.status(HttpStatus.OK).json({
          message: 'Cart has been updated successfully.',
          data: nextCart,
        })
      } catch (err) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: err.message,
          code: err.code ?? 'UNPROCESSABLE_ENTITY',
        })
      }
      break
    }

    case 'DELETE': {
      try {
        await CartModel.findOneAndDelete(req.query.cartId)

        res.status(HttpStatus.OK).json({
          message: 'Cart has been deleted successfully.',
          data: {},
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
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
      res
        .status(HttpStatus.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`)
    }
  }
}
