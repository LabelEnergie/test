import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, FirebaseService],
})
export class ArticlesModule {}
