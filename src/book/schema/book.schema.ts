import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true })
  publicationYear: number;

  @Prop({ required: true, unique: true })
  ISBN: string;

  @Prop({ required: true })
  numOfPages: number;
}
export const BookSchema = SchemaFactory.createForClass(Book);
