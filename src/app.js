import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import normalizePort from 'normalize-port';
import compression from 'compression';
import mongoose from 'mongoose';

const port = normalizePort(process.env.PORT || 8000);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({ threshold: 0 }));

export default app;