import pg from 'pg';
const { Client } = pg;

import GameService from './game-service.js';
import UserService from './user-service.js';

export default new class Postgress {
    async connect() {
        let client = new Client({
            host: '127.0.0.1',
            port: '1337',
            database: 'main-db',
            user: '',
            password: '',
        });

        return new Promise((resolve) => {
            client.connect()
                .then(() => {
                    console.log('connected');

                    this.client = client;
                    this.userService = new UserService(this.client);
                    this.gameService = new GameService(this.client);

                    resolve(this);
                })
                .catch(err => console.error('failed to connect to db', err.stack));
        });
    }
}
