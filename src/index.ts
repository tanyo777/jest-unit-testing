import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  const name = 'Tanyo';
  const age = 23;

  res.json({ name, age });
});

app.listen(5000);
