const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')


const ProjectRouter = require('./routers/ProjectRouter');
const ActionRouter = require('./routers/ActionRouter');


const server = express();

server.use(helmet());
server.use(morgan('short'))
server.use(express.json());

server.use('/api/users', ProjectRouter);

server.use('/api/posts', ActionRouter);


server.get('/', async (req, res) => {
    res.send(`
      <h2>Projects</h2>
    `);
  });



module.exports = server;