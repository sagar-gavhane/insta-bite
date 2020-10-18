import HttpStatus from 'http-status-codes'

import ProductModel from 'models/Product'
import dbConnect from 'utils/dbConnect'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET': {
      try {
        const conditions = {}

        if (req.query.type) {
          conditions.type = req.query.type
        }

        const products = await ProductModel.find(conditions)

        res.status(HttpStatus.OK).json({
          message: 'Products has been retrived successfully.',
          data: products,
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
