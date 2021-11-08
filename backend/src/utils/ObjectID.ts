import { Types } from 'mongoose';

class ObjectID {
  static stringToObjectID(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }

  static objectIDToString(id: Types.ObjectId): string {
    return id.toString();
  }

  static stringArrayToObjectIDArray(idArray: string[]): Types.ObjectId[] {
    return idArray.map((id) => ObjectID.stringToObjectID(id));
  }
}

export default ObjectID;
