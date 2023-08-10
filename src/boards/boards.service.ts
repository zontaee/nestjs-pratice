import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import { Board } from './boards.entity';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsRepository)
    private boardRepository: BoardsRepository,
  ) {}
  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid,
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //
  //   this.boards.push(board);
  //   return board;
  // }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) throw new NotFoundException(`can't find id ${id} `);
    return found;
  }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) throw new NotFoundException(`can't find id ${id} `);
  //   return found;
  // }
  //
  async deleteBoard(id: number): Promise<void> {
    // const found = this.getBoardById(id);
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException("can't find Board");
  }
  //
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
