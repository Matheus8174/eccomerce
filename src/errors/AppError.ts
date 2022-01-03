type messageType = { 
  [x: string]: string 
} | string

class AppError {
  constructor (public readonly message: messageType, public readonly statusCode: number) {}
}

export default AppError;