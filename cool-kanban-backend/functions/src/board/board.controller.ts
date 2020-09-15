import { Response } from 'express';
import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from '../core/entities/board.entity';
import { CreateBoardDto, UpdateBoardDto } from './dtos';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async getAll(
    @Body('user') user: UserRecord,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const boards: Board[] = await this.boardService.getAll(user.uid);
      res.status(HttpStatus.OK).send(boards);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Get(':id')
  async get(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const board: Board = await this.boardService.get(id);
      res.status(HttpStatus.OK).send(board);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Post()
  async create(
    @Body('user') user: UserRecord,
    @Body() dto: CreateBoardDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const board: Board = await this.boardService.create(user.uid, dto);
      res.status(HttpStatus.CREATED).send(board);
    } catch (error) {
      res
        .send(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBoardDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const board: Board = await this.boardService.update(id, dto);
      res.status(HttpStatus.OK).send(board);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      await this.boardService.delete(id);
      res.status(HttpStatus.OK).send(true);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Put(':id/join/:uid')
  async join(
    @Param('id') id: string,
    @Param('uid') uid: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.boardService.join(id, uid);
      res.status(HttpStatus.OK).send(true);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Put(':id/kick/:uid')
  async kick(
    @Param('id') id: string,
    @Param('uid') uid: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.boardService.kick(id, uid);
      res.status(HttpStatus.OK).send(true);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
