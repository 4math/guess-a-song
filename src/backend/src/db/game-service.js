export default class GameService {
    constructor(client) {
        this.client = client
    }

    create = async (matchData) => await this.client.query('insert into matches (score) values ($1)', [matchData.score]);
    // update
    // get
    // getAll
}
