import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';
import { resolve } from 'path';

@Module({
  imports: [
    FileModule,
    TrackModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.eunlc.mongodb.net/music-platform?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
