import Joi from 'joi';

export function RepoParamsSchema(queryParams: { qty?: any, sort?: any }) {
  const schema = Joi.object({
    qty: Joi.number().greater(0).optional(),
    sort: Joi.string().equal('asc', 'desc').optional(),
  });

  const validation = schema.validate(queryParams);
  return {
    value: validation.value,
    error: validation.error?.message,
  };
}
