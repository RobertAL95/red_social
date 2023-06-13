const TABLE = 'auth';
const auth =  require('../../../auth');
const bcrypt = require('bcrypt')

module.exports = (injectedStore) => {
    
    let store = injectedStore;
    if(!store){
        store = require('../../../store/mysql');
    }

    const login = async (username, password) => {
        const data = await store.query(TABLE, {username: username});
       
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    // Generar token;
                    return auth.sign(data)
                } else {
                    throw new Error('Informacion invalida');
                }
            });
    }

    const upsert = async (data) => {
        const authData = {
            id: data.id,
        }
        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLE, authData);
    }

    return{
        login,
        upsert,
    }
}