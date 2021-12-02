import { Types } from 'mongoose';

class Pipeline {
  postPipelineTemplate(match: object, cursor: number, PERPAGE: number) {
    return [
      match,
      { $sort: { createdAt: -1 } },
      { $skip: cursor },
      { $limit: PERPAGE },
      {
        $lookup: {
          from: 'users',
          let: { userID: '$userID' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$userID'] } } },
            { $project: { _id: 1, username: 1, profileImage: 1 } },
          ],
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'images',
          let: { postID: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$targetID', '$$postID'] } } },
            { $unset: 'targetID' },
          ],
          as: 'images',
        },
      },
      {
        $lookup: {
          from: 'comments',
          let: { postID: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$postID', '$$postID'] } } },
            {
              $lookup: {
                from: 'users',
                let: { userID: '$userID' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$userID'] } } },
                  { $project: { _id: 1, username: 1, profileImage: 1 } },
                ],
                as: 'user',
              },
            },
            { $unwind: '$user' },
            {
              $lookup: {
                from: 'commentlikes',
                let: { commentID: '$_id' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$commentID', '$$commentID'] } } },
                  {
                    $lookup: {
                      from: 'users',
                      let: { userID: '$userID' },
                      pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$userID'] } } },
                        { $project: { _id: 1, username: 1, profileImage: 1 } },
                      ],
                      as: 'user',
                    },
                  },
                  { $unwind: '$user' },
                  { $unset: ['commentID', 'userID'] },
                ],
                as: 'likes',
              },
            },
            { $unset: ['postID', 'userID'] },
          ],
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'postlikes',
          let: { postID: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$postID', '$$postID'] } } },
            {
              $lookup: {
                from: 'users',
                let: { userID: '$userID' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$userID'] } } },
                  { $project: { _id: 1, username: 1, profileImage: 1 } },
                ],
                as: 'user',
              },
            },
            { $unwind: '$user' },
            { $unset: ['postID', 'userID'] },
          ],
          as: 'likes',
        },
      },
      { $unset: 'userID' },
    ];
  }

  randomPosts(userID: string, cursor: number, PERPAGE: number) {
    return this.postPipelineTemplate(
      { $match: { userID: { $ne: new Types.ObjectId(userID) } } },
      cursor,
      PERPAGE,
    );
  }

  timeline(containsArray: any, cursor: number, PERPAGE: number) {
    return this.postPipelineTemplate(
      { $match: { userID: { $in: containsArray } } },
      cursor,
      PERPAGE,
    );
  }

  userTimeline(userID: string, cursor: number, PERPAGE: number) {
    return this.postPipelineTemplate(
      { $match: { userID: new Types.ObjectId(userID) } },
      cursor,
      PERPAGE,
    );
  }
}

export default new Pipeline();
