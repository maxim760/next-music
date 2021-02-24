import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, IFile } from 'src/file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';
import { ITrackAll } from './track.controller';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, pictureFile, audioFile): Promise<Track> {
    const picture = this.fileService.createFile(IFile.PICTURE, pictureFile);
    const audio = this.fileService.createFile(IFile.AUDIO, audioFile);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      picture,
      audio,
    });
    return track;
  }

  async getAll({ offset = 0, count = 10 }: ITrackAll): Promise<Track[]> {
    const tracks = await this.trackModel
      .find({})
      .sort({_id: -1})
      .skip(+offset)
      .limit(+count);
    return tracks;
  }
  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }
  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
      ],
    }).sort({_id: -1});
    return tracks;
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.track);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
  async getComments(): Promise<Comment[]> {
    const comments = await this.commentModel.find({});
    return comments;
  }
  async removeComment(id: ObjectId): Promise<ObjectId> {
    const comment = await this.commentModel.findById(id);

    const track = await this.trackModel.findById(comment.track);
    track.comments = track.comments.filter(
      (com) => com.toString() !== id.toString(),
    );
    await track.save();
    await comment.remove();
    return comment._id;
  }

  async listen(id: ObjectId): Promise<void> {
    const track = await this.trackModel.findById(id);
    track.listens++;
    track.save();
  }
}
