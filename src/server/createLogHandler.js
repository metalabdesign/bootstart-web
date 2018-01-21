import {request, next} from 'midori';
import log from '/log';

export default () => request((req) => {
  log.info(() => {
    return {
      message: 'request',
      method: req.method,
    };
  });
  return next;
});
