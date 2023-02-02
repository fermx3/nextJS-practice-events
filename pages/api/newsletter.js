import { connectDatabase, insertDocument } from "../../helpers/db-utils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const enteredEmail = req.body.email;

    if (!enteredEmail || !enteredEmail.includes("@")) {
      res
        .status(422)
        .json({ message: "Invalid email address. Please try again." });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Database connection failed! Please try again later.",
      });
      return;
    }

    try {
      await insertDocument(client, "newsletterEmails", { email: enteredEmail });
      client.close();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Inserting data failed! Please try again later." });
      return;
    }

    res.status(201).json({ message: "Signed up!", email: enteredEmail });
  }
};

export default handler;
