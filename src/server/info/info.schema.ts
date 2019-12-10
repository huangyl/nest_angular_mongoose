import { Schema } from 'mongoose';
import * as moment from 'moment'

export const InfoSchema: Schema = new Schema({
    platform: { type: String, trim: true, index: true },
    info: {
        url: { type: String, trim: true },
        line: Number,
        column: Number,
        ua: { type: String, trim: true, required: true },
        message: {
            type: String,
            trim: true,
            required: true,
            maxlength: 1024,
            // match:,//正则验证器
            // validate(){//自定义验证器

            // }
        },
        errorObj: { type: String, trim: true },
        page: { type: String, trim: true },
        time: {
            type: String, default: Date.now, set(value) {
                return moment(value).format('YYYY-MM-DD hh:mm:ss')
            }
        },
    },
    fixed: {
        isFixed: { type: Boolean, default: false },
        fixedTime: {
            type: String, default: Date.now, set(value) {
                return moment(value).format('YYYY-MM-DD hh:mm:ss')
            }
        },
        fixeder: {
            type: String,
            trim: true,
            // enum: ['xx', 'xxx', 'xxxx', 'xxxxx']//只能用于String类型
        },
    }
});


// 扩展实例方法和静态方法
// InfoSchema.methods.xxx = (xxx, cb) => {
//     this.find({ xxx }, (err, docs) => cb(err, cb))
// }

// InfoSchema.statics.xxx = (xxx, cb) => {
//     this.find({ xxx }, (err, docs) => cb(err, cb))
// }