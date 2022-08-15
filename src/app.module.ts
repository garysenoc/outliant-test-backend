import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb://localhost:27017/book',
        autoIndex: true,
      }),
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
