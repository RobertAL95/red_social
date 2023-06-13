const mysql = require('mysql2');

const config = require('../config');

const dbconf = {
    host: '127.0.0.1',
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

const list = (table, id) => {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

const get = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

const insert = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const update = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const upsert = async (table, data) => {
    let row = []
    if(data.id){
        row = await get(table, data.id)
    }
    
    if (row.length === 0) {
      return insert(table, data);
    } else {
      return update(table, data);
    }
}
const query = (table, query, join) => {
    
    let joinQuery = '';
    if(join){
        const key = Ocject.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
    }
    
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        });
    });
};

module.exports = {
    list,
    get,
    insert,
    update,
    upsert,
    query
};