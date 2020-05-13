const { MongoClient } = require("mongoDb"); 9
const mongoSecret = require("./db.mongoSecret");

let dataToReturn = null;

async function getVideoIDs() {
    const uri = `mongodb+srv://JDiaz:${mongoSecret.password}@cluster0-yhdjk.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const dbQueryObject = client.db("someGuyWhoCodes").collection("someGuyWhoCodes-db-1");

        await dbQueryObject.find().sort({ "_id": -1 }).toArray() // Need toArray here to make the .find() call promise-able
            .then((documents) => {
                dataToReturn = documents;
            })
            .catch(error => {
                return "DB post error: ", error
            })

    } catch (e) {
        return "DB ereor: ", e;
    } finally {
        await client.close();
        if (dataToReturn) {
            return dataToReturn
        }
    }
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = { getVideoIDs }