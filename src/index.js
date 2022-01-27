const server = require('./server');
const { db: dbConfig }  = require('./config');

const db = require('./db')(dbConfig);

function enableGracefulShutdown() {
  const exitHandler = async (error) => {
    if (error) console.log(error);
    console.log('Gracefully shutting shown');
    server.stop(() => process.exit());
  };

  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);
  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);
  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}

async function boot () {
  enableGracefulShutdown();
  try {
    await db.testConnection();
    // await db.createUser({
    //   'username': 'adminAn',
    //   'surname': 'kordonska',
    //   'patronymic': 'oleksandrivna',
    //   'email': 'kordonskanastya@gmail.com',
    //   'password': '96915cf044e0515d35cfe7500b2079a4cd2531b9a6c07f2532e563a8f6482165'
    // });
    server.start();
  } catch(err) {
    console.error(err.message || err);
  }
};

boot();
