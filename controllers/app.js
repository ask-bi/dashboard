const Apps = require('../models/Apps');
const { getIntent } = require('../helpers/apis');
const { execQuery } = require('../helpers/db');

const mysql = require('mysql');

exports.getResponse = async (req, res) => {
  const { appID } = req.params;
  const { command } = req.query;
  let app = {};
  try {
    app = await Apps.findById(appID);
  } catch (e) {
    return res.status(500).send(e);
  }
  const connection = mysql.createConnection(app.connectionString);
  await connection.connect();
  const data = await execQuery(connection, 'show databases');
  const dbs = data.map((e) => e.Database);
  // fetch all tables
  const tables = dbs.map(async (db) => {
    tables = await execQuery(connection, `use ${db}; show tables`);
    return tables;
  } )
  console.log(tables)
  const r = await getIntent(command);
    
  // fetch query
  // make connection and fetch data
  res.send({
    type: 'plain_text',
    content: 'pong',
  });
};
