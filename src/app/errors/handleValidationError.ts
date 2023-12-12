import mongoose from 'mongoose'
import { TErrorSource } from '../interface/errors'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400

  const errorSources: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleValidationError
