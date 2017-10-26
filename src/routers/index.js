import noteController from './notes';
import folderController from './folders';
export default (app) => {
  app.use('/v1/api/notes', noteController);
  app.use('/v1/api/folders', folderController);
}