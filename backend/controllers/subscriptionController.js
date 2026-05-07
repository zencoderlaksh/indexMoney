const path = require("path");
const SubscriptionRequest = require("../models/subscriptionRequestModel");

const createSubscriptionRequest = async (req, res, next) => {
  try {
    const { fullName, mobile, planName, txnId } = req.body;

    if (!fullName || !mobile || !planName || !txnId) {
      return res.status(400).json({
        error: "Full name, mobile, plan name, and transaction ID are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Payment screenshot is required",
      });
    }

    const request = await SubscriptionRequest.create({
      fullName,
      mobile,
      planName,
      txnId,
      screenshotOriginalName: req.file.originalname,
      screenshotStoredName: req.file.filename,
      screenshotPath: path.relative(process.cwd(), req.file.path),
    });

    res.status(201).json({
      data: request,
      message:
        "Payment screenshot submitted successfully. Our team will verify and activate your subscription shortly.",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSubscriptionRequest,
};
