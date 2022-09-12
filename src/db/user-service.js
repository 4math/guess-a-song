export default class UserService {
    constructor(client) {
        this.client = client
    }

    create = async (userData) => await this.client.query('insert into users (name) values ($1)', [userData.name]);
    // update
    // get
}
