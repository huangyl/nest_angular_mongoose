import { Document } from 'mongoose'
export interface IInfoDocument extends Document {
    platform: String,
    info: {
        url: string,
        line: number,
        column: number,
        ua: string,
        message: string,
        errorObj: string,
        page: string,
        time?: String
    },
    fixed?: {
        isFixed: boolean,
        fixedTime?: String,
        fixeder?: string,
    }
}