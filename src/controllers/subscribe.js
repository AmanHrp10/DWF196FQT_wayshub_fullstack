const { Subscribe, Channel, Video } = require('../../models');
const Joi = require('joi');

//? Add subscribe
exports.addSubscribe = async (req, res) => {
  try {
    const { id } = req.id;
    const { body } = req;

    const isChannel = await Channel.findOne({
      where: {
        id: body.channelId,
      },
    });

    //? Handle subscribe yourself
    if (id === body.channelId) {
      return res.send({
        status: 'Request failed',
        message: 'Cannot subscribe channel yourself',
      });
    }
    //? Check existed of channel
    if (!isChannel) {
      return res.send({
        status: 'Request failed',
        message: 'Channel not found',
      });
    }

    //? Validation
    const schema = Joi.object({
      channelId: Joi.number().integer().required(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    //! Error message
    if (error) {
      return res.send({
        status: 'Request failed',
        message: error.details.map((err) => err.message),
      });
    }

    const subscribe = await Subscribe.findOne({
      where: {
        channelId: body.channelId,
        subsChannelId: id,
      },
    });

    // //? Check subscribtion existed
    if (subscribe) {
      return res.send({
        status: 'Request failed',
        message: 'Cannot subscribe this channel again',
        data: {
          id: subscribe.channelId,
        },
      });
    }

    //? Add subscribe
    await Subscribe.create({
      ...body,
      subsChannelId: id,
    });

    //? Get channel was subscribed
    const channel = await Channel.findOne({
      where: {
        id: body.channelId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    res.send({
      status: 'Request success',
      message: 'Subscribe was added',
      count: channel.length,
      data: {
        subscribe: {
          channel,
        },
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Unsubscribe
exports.removeSubscribe = async (req, res) => {
  try {
    //? Init id Channel & Subscribtion
    const { id: subsChannelId } = req.id;
    const { id: channelId } = req.params;

    //? Filter Subscribe
    const subscribtion = await Subscribe.findOne({
      where: {
        channelId,
        subsChannelId,
      },
    });
    console.log(channelId);

    //! if ID not match on params
    if (!subscribtion) {
      return res.send({
        status: 'Request failed',
        message: 'Resource not found',
      });
    }

    //? Delete action
    subscribtion.destroy();

    //? Response
    res.send({
      status: 'Request success',
      message: 'Unsubscribed',
      data: {
        id: channelId,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Get My subscribe
exports.getSubscribers = async (req, res) => {
  try {
    const { id } = req.id;

    //? Get channel as login user
    const subscribtion = await Channel.findOne({
      where: {
        id,
      },
      attributes: [],
      include: {
        model: Channel,
        as: 'subscribed',
        through: {
          attributes: [],
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
        include: {
          model: Video,
          as: 'videos',
          attributes: {
            exclude: ['updatedAt', 'channelId', 'ChannelId'],
          },
        },
      },
    });

    if (!subscribtion) {
      return res.send({
        status: 'Request failed',
        message: "don't have a subscriber",
      });
    }
    res.send({
      status: 'Request succes',
      message: 'Subscribtion was fetching',
      count: '',
      data: subscribtion,
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

//? get subscriber count
exports.getCountSubscriber = async (req, res) => {
  try {
    const { id } = req.id;
    const channel = await Channel.findOne({
      where: {
        id,
      },
    });

    const channels = await Channel.findAll();

    //? Get all data Subscribes & filter
    const subscribe = await Subscribe.findAll();
    const subsCount = subscribe.filter(
      (subscribe) => subscribe.channelId == channel.id
    );
    const channaelFilter = channels.filter((s) => s.id == subsCount);

    if (subsCount.length === 0) {
      return res.send({
        status: 'Request failed',
        message: 'nothing subscribe on this channel',
      });
    }

    console.log(channaelFilter);

    res.send({
      status: 'Request succes',
      message: 'subscribers was fetched',
      count: subsCount.length,
      data: {
        subscribers: subsCount,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};
