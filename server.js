//Imports
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: "MY_API_KEY" }); //Replace "MY_API_KEY" with your OpenAI API project key

//Set up bodyParser to parse JSON
app.use(bodyParser.json());

//Get files from public directory
app.use(express.static(path.join(__dirname, "public")));

//Declare factors used to generate a review for each type of product
const skincareFactors =
  "sustainability, effectiveness, and suitability for different skin types";
const haircareFactors =
  "sustainability, effectiveness, and suitability for different hair types";
const clothingFactors =
  "sustainability, quality, and suitability for different body types";
const makeupFactors = "sustainability, durability, and quality";

//Handle POST request
app.post("/submit", (req, res) => {
  const type = req.body.type;
  const name = req.body.name;
  console.log(`User input: ${name} of ${type} type`);

  let factor;
  if (type === "Haircare") {
    factor = haircareFactors;
  } else if (type === "Makeup") {
    factor = makeupFactors;
  } else if (type === "Skincare") {
    factor = skincareFactors;
  } else {
    factor = clothingFactors;
  }

  //Send Chat Completions request to Open AI API
  async function getReview() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "For the following product, based on information from credible reviews, you will provide a summary of the product's ${factor}. The response should be a paragraph approximately 100 words in length.",
        },
        { role: "user", content: userInput },
      ],
      model: "gpt-4o-mini",
    });

    //Return response
    res.send(completion.choices[0]);
  }

  getReview();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
