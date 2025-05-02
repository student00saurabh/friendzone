const Joi = require("joi");

module.exports.postSchema = Joi.object({
  post: Joi.object({
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
  }).required(),
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    content: Joi.string().required(),
  }).required(),
});

module.exports.likeSchema = Joi.object({
  like: Joi.object().required(),
});
