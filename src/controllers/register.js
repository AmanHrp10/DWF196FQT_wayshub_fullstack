const { Channel } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

exports.register = async (req, res) => {
  try {
    const { body } = req;
    const schema = Joi.object({
      email: Joi.string().email().min(10).required(),
      password: Joi.string().min(8).required(),
      channelName: Joi.string().min(2).required(),
      description: Joi.string().min(10).required(),
    });
    const { error } = schema.validate(body, { abortEarly: false });

    if (error) {
      return res.status(500).send({
        status: 'Validation error',
        message: error.details.map((err) => err.message),
      });
    }

    const checkEmail = await Channel.findOne({
      where: {
        email: body.email,
      },
    });

    if (checkEmail) {
      return res.status(409).send({
        status: 'Request failed',
        message: 'Email already exist',
      });
    }

    const { email, password, channelName, description } = body;
    const passwordHash = await bcrypt.hash(password, 10);

    const channel = await Channel.create({
      email,
      password: passwordHash,
      channelName,
      description,
    });

    const privateKey = process.env.JWT_PRIVATE_KEY;

    const token = jwt.sign(
      {
        id: channel.id,
      },
      privateKey
    );

    res.status(201).send({
      status: 'Request success',
      message: 'Your account was registered',
      data: {
        channel: {
          id: channel.id,
          email: channel.email,
          channelName: channel.channelName,
          photo: channel.photo,
          thumbnail: channel.thumbnail,
          description: channel.description,
          token,
        },
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 'Request failed',
      message: err.message,
    });
  }
};
