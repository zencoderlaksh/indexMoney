require("dotenv").config();

const mongoose = require("mongoose");
const config = require("../config");
const HomepageContent = require("../models/homepageContentModel");

const todaysResults = [
  { label: "NIFTY", points: "+45 pts", note: "+45 pts ↗" },
  { label: "BANKNIFTY", points: "+80 pts", note: "+80 pts ↗" },
  { label: "SENSEX", points: "+120 pts", note: "+120 pts ↗" },
];

const seed = async () => {
  await mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const content = await HomepageContent.findOneAndUpdate(
    { key: "homepage" },
    { key: "homepage", todaysResults },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  console.log(
    `Seeded homepage content ${content._id} with ${content.todaysResults.length} rows.`,
  );

  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
