import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import usersRouter from './api/users';
import './db';
import './seedDate';
//import session from 'express-session';
import passport from './authenticate';

dotenv.config();

const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT;

//session middleware
app.use(passport.initialize());

app.use(express.json());

app.use('/api/genres', genresRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', passport.authenticate('jwt', {session:false}), moviesRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});