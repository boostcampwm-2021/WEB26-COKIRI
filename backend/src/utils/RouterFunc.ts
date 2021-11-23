import { RESPONSECODE, PERPAGE } from 'src/utils';

interface CursorDataType {
  code: string;
  nextCursor?: number;
  data: object;
}

class RouterFunc {
  makeCursorData(posts: object, postCount: number, cursor: number): CursorDataType {
    const data: CursorDataType = {
      code: RESPONSECODE.SUCCESS,
      nextCursor: cursor + PERPAGE,
      data: posts,
    };

    if (cursor + 1 >= postCount) {
      delete data.nextCursor;
    } else if (data.nextCursor! > postCount) {
      data.nextCursor = postCount - 1;
    }
    return data;
  }
}

export default new RouterFunc();
