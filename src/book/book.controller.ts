import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    try {
      const result = await this.bookService.create(createBookDto);
      if (!result) {
        throw new Error();
      }
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.bookService.findOne(id);
      if (!result) {
        throw new Error();
      }
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.bookService.update(id, updateBookDto);
      if (!result) {
        throw new Error();
      }
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.bookService.remove(id);
      if (!result) {
        throw new Error();
      }
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
