import { Controller, Get, Query, ServiceUnavailableException, ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InfoService } from './info.service';
import { IInfoDocument } from '../../shared/interfaces/info.interface';
import { isNullOrUndefined } from 'util';

@Controller('/api/info')
export class InfoController {
    constructor(
        private readonly infoService: InfoService
    ) { }

    /**
     * 创建记录
     * @param line 行号
     * @param column 列号
     * @param ua user-agent
     * @param message 错误信息
     * @param errorObj 错误对象
     * @param url 错误发生的页面地址
     * @param time 发生时间
     * @param platform 平台
     */
    @Get()
    async carete(
        @Query('url') url: string,
        @Query('line') line: number,
        @Query('column') column: number,
        @Query('ua') ua: string,
        @Query('message') message: string,
        @Query('errorObj') errorObj: string,
        @Query('page') page: string,
        @Query('platform') platform: string
    ) {
        if (isNullOrUndefined(platform) || platform.length == 0) {
            throw new BadRequestException('参数不合法，未包含平台参数')
        }
        let result = await this.infoService.create({
            platform,
            info: {
                url,
                line,
                column,
                ua,
                message,
                errorObj,
                page
            }
        });
        return {
            code: 0
        };
    }

    @Get('count')
    async count(@Query('isFixed') isFixed: string, @Query('fixeder') fixeder: string) {
        if ((isFixed && isFixed.length > 0) && (fixeder && fixeder.length > 0)) {
            return this.countByFixeder(isFixed, fixeder)
        }
        else if (isFixed && isFixed.length > 0) {
            return this.countByFixed(isFixed)
        } else {
            throw new NotFoundException('访问接口/api/info/count没有带参数')
        }
    }

    @Get('countByFixed')
    async countByFixed(@Query('isFixed') isFixed: string) {
        if(isNullOrUndefined(isFixed) || isFixed.length == 0){
            throw new NotFoundException('访问接口/api/info/countByFixed没有带参数')
        }
        return this.infoService.countByFixed(isFixed.trim() === "false" ? false : true);
    }

    @Get('countByFixeder')
    async countByFixeder(@Query('isFixed') isFixed: string, @Query('fixeder') fixeder: string) {
        if(isNullOrUndefined(isFixed) || isFixed.length == 0 || isNullOrUndefined(fixeder) || fixeder.length == 0){
            throw new NotFoundException('访问接口/api/info/countByFixeder没有带参数')
        }
        return this.infoService.countByFixeder(isFixed.trim() === "false" ? false : true, fixeder.split(','));
    }
}
