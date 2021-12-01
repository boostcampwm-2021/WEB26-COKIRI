import { Types } from 'mongoose';

class ObjectID {
  create(): Types.ObjectId {
    return new Types.ObjectId();
  }

  stringToObjectID(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }

  objectIDToString(id: Types.ObjectId): string {
    return id.toString();
  }

  stringArrayToObjectIDArray(idArray: string[]): Types.ObjectId[] {
    return idArray.map((id) => this.stringToObjectID(id));
  }
}

export default new ObjectID();
