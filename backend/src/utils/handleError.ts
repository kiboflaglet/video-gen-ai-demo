import { env } from "./env"

export const handleError = (error: string) => {
    if (env.NODE_ENV === 'development') {
        console.log(error)
    }
}