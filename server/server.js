import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'hello from ChatGPT CodeX',
  });
}),
  app.post('/', async (req, res) => {
    try {
      const prompt = req.body.prompt;
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0.6,
        presence_penalty: 0,
      });

      res.status(200).send({
        bot: response.data.choices[0].text,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });

app.listen(port, () => console.log(`listening on... http://localhost:5000`));
