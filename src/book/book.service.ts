import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import BookInteface from './interface/book.interface';
import { Book, BookDocument } from './schema/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  _transformBook(book: BookDocument): BookInteface {
    console.log('RES', book);
    const { _id, title, authorName, publicationYear, ISBN, numOfPages } = book;
    return { id: _id, title, authorName, publicationYear, ISBN, numOfPages };
  }

  async create(createBookDto: CreateBookDto): Promise<BookInteface> {
    const newBook = new this.bookModel(createBookDto);
    return this._transformBook(await newBook.save());
  }

  async findAll() {
    const result = await this.bookModel.find();
    return result.map((book) => this._transformBook(book));
  }

  async findOne(id: string) {
    try {
      const book = await this.bookModel.findById(id);
      return this._transformBook(book);
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updatedBook: UpdateBookDto): Promise<boolean> {
    const result = await this.bookModel.updateOne(
      { _id: id },
      { $set: updatedBook },
    );
    if (result.matchedCount == 0) {
      // book not found
      return false;
    }
    return true;
  }

  async remove(id: string) {
    console.log('REMOVE');
    const result = await this.bookModel.findByIdAndDelete({ _id: id });
    return this._transformBook(result);
  }
}
