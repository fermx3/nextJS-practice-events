import {
  connectDatabase,
  getFilteredComments,
  insertDocument,
} from "../../../helpers/db-utils";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Database connection failed! Please try again later." });
    return;
  }

  if (req.method === "GET") {
    const query = { eventId: eventId };

    let selectedComments;

    try {
      selectedComments = await getFilteredComments(client, "comments", query, {
        date: -1,
      });
      res.status(200).json({ comments: selectedComments });
    } catch (error) {
      res.status(500).json({
        message: "Comments retrieval failed! Please try again later.",
      });
    }
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      date: new Date(),
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      res.status(201).json({ message: "Comment send!", newComment, result });
    } catch (error) {
      res.status(500).json({
        message: "Comment insertion failed! Please try again later.",
      });
    }
  }
};

export default handler;
