import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { InfoModule } from './info/info.module';

@Module({
    imports: [
        InfoModule,
        MongooseModule.forRoot('mongodb://localhost/fed-monitor', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    ],
    controllers: [
        AppController
    ],
    providers: [],
})
export class AppModule { }
