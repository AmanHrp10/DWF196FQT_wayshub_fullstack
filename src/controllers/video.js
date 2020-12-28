const { Video, Channel, Comment } = require('../../models');
const Joi = require('joi');

//?  Get videos all
exports.getVideoAll = async (req, res) => {
  try {
    const videos = await Video.findAll({
      attributes: {
        exclude: ['channelId', 'updatedAt', 'ChannelId'],
      },
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'ChannelId',
            'subscribeId',
            'commentId',
            'password',
          ],
        },
      },
    });
    if (!videos) {
      res.send({
        status: 'Request success',
        message: `Channel not exist`,
        count: videos.length,
        data: {
          videos,
        },
      });
    }
    res.send({
      status: 'Request success',
      message: 'Data succesfully fetched',
      count: videos.length,
      data: {
        videos,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Get video by id
exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['channelId', 'updatedAt', 'ChannelId'],
      },
      include: [
        {
          model: Channel,
          as: 'channel',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: Comment,
          as: 'comments',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'channelId',
              'videoId',
              'ChannelId',
              'VideoId',
            ],
          },
          include: {
            model: Channel,
            as: 'channel',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
          },
        },
      ],
    });
    if (!video) {
      res.send({
        status: 'Request success',
        message: `Video id ${id} not exist`,
        data: {
          video,
        },
      });
    }
    res.send({
      status: 'Request success',
      message: 'Data succesfully fetched',
      data: {
        video,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: {
        error: 'Server error',
      },
    });
  }
};

//? Add video
exports.addVideo = async (req, res) => {
  try {
    const { id } = req.id;
    const { body, files } = req;

    const fileThumbnail = files.thumbnail[0].filename;
    const fileVideo = files.video[0].filename;
    console.log(files);

    //? Validation
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.send({
        status: 'Request failed',
        error: {
          message: error.details.map((err) => err.message),
        },
      });
    }

    const newVideo = await Video.create({
      ...body,
      channelId: id,
      thumbnail: fileThumbnail,
      video: fileVideo,
      viewCount: 0,
    });

    const video = await Video.findOne({
      where: {
        id: newVideo.id,
      },
      attributes: {
        exclude: ['updatedAt', 'channelId', 'ChannelId'],
      },
      include: [
        {
          model: Channel,
          as: 'channel',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: Comment,
          as: 'comments',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'channelId',
              'videoId',
              'ChannelId',
              'VideoId',
            ],
          },
        },
      ],
    });
    res.send({
      status: 'Request success',
      message: 'Video succesfully Added',
      data: {
        video,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Update video
exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const detailVideo = await Video.findOne({ where: { id } });

    if (!detailVideo) {
      return res.status(404).send({
        status: 'Request failed',
        message: `Video with id ${id} not found`,
        data: [],
      });
    }
    const schema = Joi.object({
      title: Joi.string(),
      description: Joi.string(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        status: 'Request failed',
        error: {
          message: error.details.map((err) => err.message),
        },
      });
    }

    await Video.update(body, { where: { id } });

    const videoUpdated = await Video.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ChannelId', 'channelId'],
      },
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
    });

    //? Response Video after updated
    res.send({
      status: 'Request success',
      message: 'Video succesfully updated',
      data: {
        video: videoUpdated,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: {
        error: 'Server error',
      },
    });
  }
};

//? Delete video
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Video.destroy({
      where: { id },
    });

    //? Where id not exist
    if (!deletedVideo) {
      return res.send({
        status: 'Request failed',
        message: `Video with id ${id} not found`,
        data: {
          video: deletedVideo,
        },
      });
    }

    //? Response after deleted
    res.send({
      status: 'Request success',
      message: 'Video succesfully deleted',
      data: {
        video: deletedVideo,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: {
        error: 'Server error',
      },
    });
  }
};
