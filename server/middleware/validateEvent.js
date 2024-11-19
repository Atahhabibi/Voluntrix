const validateEvent = (req, res, next) => {
  const { name, type, location, time, date, description } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Name is required and must be a valid string." });
  }

  if (!type || typeof type !== "string" || type.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Type is required and must be a valid string." });
  }

  if (
    !location ||
    typeof location !== "string" ||
    location.trim().length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Location is required and must be a valid string." });
  }

  if (!time || !/^\d{2}:\d{2}$/.test(time)) {
    return res
      .status(400)
      .json({ error: "Time is required and must be in HH:mm format." });
  }

  if (!date || isNaN(new Date(date).getTime())) {
    return res
      .status(400)
      .json({ error: "Date is required and must be a valid date." });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Description is required and must be a valid string." });
  }

  next();
};

module.exports = validateEvent;
