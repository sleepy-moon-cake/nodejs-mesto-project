import { Response, NextFunction } from 'express';

const withTemporaryUser = (req: any, res: Response, next: NextFunction) => {
  req.user = {
    id: '6815f6a1c20deaac5a9eae49',
  };
  next();
};

export default withTemporaryUser;
