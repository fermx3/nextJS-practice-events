const handler = (req, res) => {
  if (req.method === "POST") {
    const enteredEmail = req.body.email;

    if (!enteredEmail || !enteredEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const id =
      new Date().toISOString() + "_" + Math.round(Math.random() * 1000);

    const newEmail = {
      id,
      enteredEmail,
    };

    // fetch(
    //   `https://nextjs-course-84422-default-rtdb.firebaseio.com/newsletter/${id}`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(newEmail),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    res.status(201).json({ message: "Signed up!", newEmail });
  }
};

export default handler;
