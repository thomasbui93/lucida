import noteController from './notes';

export default (app) => {
  app.use('/v1/api/notes', noteController);
}