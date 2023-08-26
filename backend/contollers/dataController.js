const asyncHandler = require("express-async-handler");
const { BooksModel } = require("../models");
const getData = asyncHandler(async (req, res) => {
  const aggregate = [
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "types",
          localField: "type",
          foreignField: "_id",
          as: "type",
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "chapters",
          localField: "_id",
          foreignField: "book",
          as: "chapters",
        },
    },
    {
      $unwind:
        /**
         * path: Path to the array field.
         * includeArrayIndex: Optional name for index.
         * preserveNullAndEmptyArrays: Optional
         *   toggle to unwind null and empty values.
         */
        {
          path: "$chapters",
          preserveNullAndEmptyArrays: true,
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "movements",
          localField: "_id",
          foreignField: "book",
          as: "movements",
        },
    },
    {
      $unwind:
        /**
         * path: Path to the array field.
         * includeArrayIndex: Optional name for index.
         * preserveNullAndEmptyArrays: Optional
         *   toggle to unwind null and empty values.
         */
        {
          path: "$movements",
          preserveNullAndEmptyArrays: true,
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "chapaudios",
          localField: "chapters._id",
          foreignField: "chapters",
          as: "chapters.audios",
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "movaudios",
          localField: "movements._id",
          foreignField: "movements",
          as: "movements.audios",
        },
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: "$_id",
          chapters: {
            $push: "$chapters",
          },
          movements: {
            $push: "$movements",
          },
          root: {
            $first: "$$ROOT",
          },
        },
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          _id: 1,
          chapters: {
            $cond: {
              if: { $eq: [ "$chapters._id", [] ] },
              then: "$$REMOVE",
              else: "$chapters",
            }
          },
          movements: {
            $cond: {
              if: { $eq: [ "$movements._id", [] ] },
              then: "$$REMOVE",
              else: "$movements",
            }
          },
          type: {
            $first: "$root.type",
          },
          bookName: "$root.bookName",
          bookImage: "$root.bookImage",
          languages: "$root.languages",
          isNew: "$root.isNew",
          isUpdated: "$root.isUpdated",
        },
    },
  ];
  BooksModel.aggregate(aggregate)
    .exec()
    .then((d) => {
      res.status(200).json({ data: d });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = { getData };
