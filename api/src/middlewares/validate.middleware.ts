import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(400).json({ errors: details });
    }

    next();
  };
