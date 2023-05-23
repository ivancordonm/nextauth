import jwt, { JwtPayload } from 'jsonwebtoken'

interface SignOptions {
  expiresIn: string
}

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: '1h'
}

export function singJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS
): string {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET!, options)
}

export function verifyJwtAccessToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!) as JwtPayload
  } catch (error) {
    console.log(error)
    return {} as JwtPayload
  }
}
