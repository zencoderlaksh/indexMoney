const HomepageContent = require("../models/homepageContentModel");

const defaultTodaysResults = [
  { label: "NIFTY", points: "+45 pts", note: "+45 pts ↗" },
  { label: "BANKNIFTY", points: "+80 pts", note: "+80 pts ↗" },
  { label: "SENSEX", points: "+120 pts", note: "+120 pts ↗" },
];

const getHomepageContent = async (req, res, next) => {
  try {
    const content = await HomepageContent.findOne({ key: "homepage" });

    res.json({
      data: {
        todaysResults:
          content?.todaysResults?.length ? content.todaysResults : defaultTodaysResults,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateHomepageContent = async (req, res, next) => {
  try {
    const rawResults = req.body?.todaysResults;
    const parsed =
      Array.isArray(rawResults) ? rawResults : JSON.parse(String(rawResults || "[]"));

    if (!Array.isArray(parsed) || !parsed.length) {
      return res
        .status(400)
        .json({ error: "todaysResults must be a non-empty JSON array" });
    }

    const todaysResults = parsed.map((item, index) => {
      const normalized = {
        label: String(item.label || "").trim(),
        points: String(item.points || "").trim(),
        note: String(item.note || "").trim(),
      };

      if (!normalized.label || !normalized.points || !normalized.note) {
        throw new Error(
          `Invalid Today's Result row at position ${index + 1}. label, points and note are required.`,
        );
      }

      return normalized;
    });

    const content = await HomepageContent.findOneAndUpdate(
      { key: "homepage" },
      { key: "homepage", todaysResults },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    if (
      req.headers["content-type"] &&
      req.headers["content-type"].includes("application/x-www-form-urlencoded")
    ) {
      return res.redirect("/api/homepage/manage");
    }

    res.json({ data: content });
  } catch (err) {
    next(err);
  }
};

const renderHomepageManager = async (req, res, next) => {
  try {
    const content = await HomepageContent.findOne({ key: "homepage" });
    const todaysResults =
      content?.todaysResults?.length ? content.todaysResults : defaultTodaysResults;

    res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>IndexMoney Homepage Manager</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f3f7f7; color: #12343b; margin: 0; padding: 32px; }
      .card { max-width: 820px; margin: 0 auto; background: white; border-radius: 16px; padding: 28px; box-shadow: 0 18px 48px rgba(16, 95, 104, 0.08); }
      h1 { margin-top: 0; }
      p, li, label { line-height: 1.6; }
      textarea, button { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #c7dfe0; margin-top: 8px; box-sizing: border-box; }
      textarea { min-height: 220px; resize: vertical; font-family: Consolas, monospace; }
      button { background: linear-gradient(135deg, #3a9295, #105f68); color: white; border: 0; font-weight: 700; cursor: pointer; margin-top: 18px; }
      code { background: #eef7f7; padding: 2px 6px; border-radius: 6px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Update Today's Results</h1>
      <p>Edit the JSON below and submit. This updates the small <code>Today's Results</code> card on the homepage.</p>
      <form action="/api/homepage" method="post">
        <label for="todaysResults">Today's Results JSON</label>
        <textarea id="todaysResults" name="todaysResults">${JSON.stringify(todaysResults, null, 2)}</textarea>
        <button type="submit">Save Today's Results</button>
      </form>
    </div>
  </body>
</html>`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  defaultTodaysResults,
  getHomepageContent,
  renderHomepageManager,
  updateHomepageContent,
};
