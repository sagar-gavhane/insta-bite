import HttpStatus from 'http-status-codes'

import OrderModel from 'models/Order'
import dbConnect from 'utils/dbConnect'
import sendMessage from 'utils/sendMessage'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'POST': {
      let order = {}
      try {
        order = await OrderModel.create(req.body)

        // send message on whatsapp
        await sendMessage({
          body: `New order has been placed. View order: https://insta-bite.com/order/${order._id}`,
        })

        res.status(HttpStatus.OK).json({
          message: 'Order has been created successfully.',
          data: order,
        })
      } catch (err) {
        if (
          err.code === 'ENOTFOUND' &&
          err.message === 'getaddrinfo ENOTFOUND api.twilio.com'
        ) {
          res.status(HttpStatus.OK).json({
            message: 'Order has been created successfully.',
            data: order,
          })
        }
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
