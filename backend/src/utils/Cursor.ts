import { RESPONSECODE, PERPAGE } from 'src/utils';

interface CursorDataType {
  code: string;
  nextCursor?: number;
  data: object;
}

class Cursor {
  setCursor(cursorTemp: string | undefined): number {
    if (!cursorTemp) {
      return 0;
    }
    return +cursorTemp;
  }

  makeCursorData(posts: object, postCount: number, cursor: number): CursorDataType {
    const data: CursorDataType = {
      code: RESPONSECODE.SUCCESS,
      nextCursor: cursor + PERPAGE,
      data: posts,
    };

    if (data.nextCursor! >= postCount) {
      delete data.nextCursor;
    }
    return data;
  }
}

export default new Cursor();
