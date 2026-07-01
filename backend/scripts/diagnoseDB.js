const mongoose = require("mongoose");
const config = require("../config");

const diagnose = async () => {
  await mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();

  console.log("=== Database Collections ===");
  for (const coll of collections) {
    const count = await db.collection(coll.name).countDocuments({});
    console.log(`- ${coll.name}: ${count} documents`);
  }

  // Check details for unlisted uploads
  const uploadColls = collections.filter(c => c.name.includes("unlisted"));
  for (const coll of uploadColls) {
    const docs = await db.collection(coll.name).find({}).limit(2).toArray();
    console.log(`\nSample docs from ${coll.name}:`, JSON.stringify(docs, null, 2));
  }

  await mongoose.disconnect();
};

diagnose().catch(console.error);
