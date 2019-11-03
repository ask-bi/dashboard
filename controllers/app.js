const mysql = require('mysql');
const knex = require('knex')({ client: 'mysql' });

const Apps = require('../models/Apps');
const { getIntent } = require('../helpers/apis');
const { execQuery } = require('../helpers/db');


const tablesOfDB = async (connection, db) => {
  await execQuery(connection, `use ${db}`);
  const tables = await execQuery(connection, 'show tables');
  return tables.map((table) => table[`Tables_in_${db}`]);
};

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
  // dbs = [db1, db2, ...]
  // fetch all tables
  console.log(dbs);
  const tMap = [];
  for (let i = 0; i < dbs.length; i++) {
    const db = dbs[i];
    const tables = await tablesOfDB(connection, db);
    tMap.push({ database: db, tables });
  }

  const r = await getIntent(command, tMap);
  console.log(r);
  const type = r.type;
  const dbName = r.result.db_name;
  const tableName = r.result.table_name;
  const commandType = r.result.command_type;
  if (type === 'as-is') {
    connection.end();
    return res.send({
      type: 'plain_text',
      content: type.body,
    });
  }
  await execQuery(connection, `use ${dbName}`);
  switch (commandType) {
    case 'select_command':
      return res.send({
        type: 'table',
        content: await knex(tableName).connection(connection).select('*'),
      });
    case 'select_count_command':
      return res.send({
        type: 'count',
        content: await knex(tableName).connection(connection).count('* as count'),
      });
    default:
      break;
  }
  // fetch query
  // make connection and fetch data
  res.send({
    type: 'plain_text',
    content: 'default',
  });
  connection.end();
};
