import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards.status.enum';
@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }

  // async deleteBoard(id: number): Promise<DeleteResult> {
  //   return this.delete(id);
  // }
}
