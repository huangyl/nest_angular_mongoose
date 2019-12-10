import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import * as _ from 'lodash'
import { IInfoDocument } from '../../shared/interfaces/info.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InfoService {
    constructor(
        @InjectModel('Info') private readonly infoModel: Model<IInfoDocument>
    ) {

    }

    /**
     * 创建错误信息记录
     * @param info 错误信息
     */
    async create(info): Promise<IInfoDocument> {
        return await new this.infoModel(info).save((err) => {
            if (err) {
                console.log(`创建错误信息记录失败,参数：${JSON.stringify(info)}`)
            }
        });
    }

    /**
     * 构建数量统计聚合条件
     * @param isFixed 是否已修复
     * @param fixeder 修复人
     */
    private buildCountAggregateCondition(isFixed: boolean, fixeder?: string[]): any[] {
        let result = []
        if (fixeder && fixeder.length > 0) {
            result.push({
                $match: {
                    fixed: { isFixed },
                    fixeder: { $in: fixeder }
                }
            })
        } else {
            result.push({
                $match: {
                    fixed: { isFixed },
                }
            })
        }
        result.push({
            $group:
            {
                _id: "$platform",//{}内的是分组条件
                count: { $sum: 1 }//类似于.count 但这是是管道函数　　所以还需要加上$sum关键词
            },
        });
        result.push({
            $sort://排序关键词
            {
                count: -1//排序规则
            }
        });
        return result;
    }


    /**
     * 根据是否已修复统计数量
     * @param isFixed 是否已修复
     */
    async countByFixed(isFixed: boolean): Promise<{ platform: string; count: number; }[]> {
        let result = await this.infoModel.aggregate(this.buildCountAggregateCondition(isFixed));
        // let result = this.infoModel.count({isFixed},)
        return result.map(item => {
            return {
                platform: item._id,
                count: item.count
            }
        });
    }

    /**
     * 根据是否已修复和修复人统计数量
     * @param isFixed 是否已修复
     * @param fixeder 修复人
     */
    async countByFixeder(isFixed: boolean, fixeder: string[]): Promise<{ platform: string; count: number; }[]> {
        let result = await this.infoModel.aggregate(this.buildCountAggregateCondition(isFixed,fixeder));
        return result.map(item => {
            return {
                platform: item._id,
                count: item.count
            }
        });
    }

    /**
     * 根据是否已修复和修复人统计数量
     * @param isFixed 是否已修复
     * @param fixeder 修复人
     */
    async countOnlyByFixeder(isFixed: boolean, fixeder: string): Promise<number> {
        return await this.infoModel.count({isFixed,fixeder})
    }
}
