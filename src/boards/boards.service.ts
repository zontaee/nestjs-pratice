import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private board: Board[] = [];

  getAllBoards(): Board[] {
    return this.board;
  }
  createBoard(title: string, description: string): Board {
    const board: Board = {
      id: uuid,
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.board.push(board);
    return board;
  }
}
