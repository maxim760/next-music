import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

export type ITrackAll = {
  offset?: number;
  count?: number;
};

@Controller('/track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get("/search")
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }


  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll({ count, offset });
  }



  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment({ ...dto });
  }

  @Get('/comment')
  getComments() {
    return this.trackService.getComments();
  }

  @Delete('/comment/:id')
  removeComment(@Param('id') id: ObjectId) {
    return this.trackService.removeComment(id);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
