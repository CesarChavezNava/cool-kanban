import { Response } from 'express';
import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto, UpdateListDto } from './dtos';
import { List } from '../core/entities/list.entity';

@Controller('lists')
export class ListController {
  constructor(private listService: ListService) {}

  @Post()
  async create(
    @Body() dto: CreateListDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const list: List = await this.listService.create(dto);
      res.status(HttpStatus.CREATED).send(list);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateListDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const list: List = await this.listService.update(id, dto);
      res.status(HttpStatus.OK).send(list);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Delete(':idBoard/:id')
  async delete(
    @Param('idBoard') idBoard: string,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.listService.delete(idBoard, id);
      res.status(HttpStatus.OK).send(true);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Put('move/:from/:to')
  async moveFromTo(
    @Param(':from') sourceIdList: string,
    @Param(':to') destIdList: string,
    @Body('source') sourceCardas: string[],
    @Body('dest') destCards: string[],
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.listService.moveFromTo(
        sourceIdList,
        destIdList,
        sourceCardas,
        destCards,
      );
      res.status(HttpStatus.OK).send(true);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Put('move/:to')
  async moveTo(
    @Param(':to') id: string,
    @Body('cards') cards: string[],
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.listService.moveTo(id, cards);
      res.status(HttpStatus.OK).send(true);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
