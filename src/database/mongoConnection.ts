import { connect, ConnectOptions, connection } from 'mongoose';

const connectionString = process.env.BD_CONNECTION_STRING;

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions);

connection.on('error', (error) => console.log(`Connection error ${error}`));
connection.once('open', () => console.log('Connected to DB!'));