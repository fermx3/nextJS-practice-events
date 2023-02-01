const dummy_data = [
  {
    id: "e1",
    comments: [
      {
        id: "comment01",
        comment: "This post 1 is amazing!",
        name: "Commenter 1",
      },
      { id: "comment02", comment: "Sure it is!", name: "Commenter 1" },
    ],
  },
  {
    id: "e2",
    comments: [
      {
        id: "comment01",
        comment: "This post 2 is amazing!",
        name: "Commenter 2",
      },
    ],
  },
  {
    id: "e3",
    comments: [
      {
        id: "comment01",
        comment: "This post 3 is amazing!",
        name: "Commenter 3",
      },
    ],
  },
];

const handler = (req, res) => {
  const commentId = req.query.eventId;

  if (req.method === "GET") {
    const selectedComments = dummy_data.find((data) => data.id === commentId);

    res.status(200).json({ comments: selectedComments.comments });
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    res.status(201).json({ message: "Success", newComment });
  }
};

export default handler;
