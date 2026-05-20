const DematAccount = require("../models/dematAccountModel");

const createDematAccountRequest = async (req, res, next) => {
  try {
    const { fullName, mobileNumber, email } = req.body;

    if (!fullName || !mobileNumber || !email) {
      return res.status(400).json({
        error: "Full name, mobile number, and email are required",
      });
    }

    if (!/^\d{10}$/.test(String(mobileNumber))) {
      return res.status(400).json({
        error: "Mobile number must be exactly 10 digits",
      });
    }

    const request = await DematAccount.create({
      fullName,
      mobileNumber,
      email,
    });

    res.status(201).json({
      data: request,
      message:
        "Demat account request submitted successfully. Our team will contact you shortly.",
    });
  } catch (err) {
    next(err);
  }
};

const listDematAccountRequests = async (req, res, next) => {
  try {
    const requests = await DematAccount.find().sort({ createdAt: -1 });
    res.json({
      data: requests,
      meta: {
        total: requests.length,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDematAccountRequest,
  listDematAccountRequests,
};
