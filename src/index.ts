import app from './app';
import bootstrap from './bootstrap';

const port = 3000;

app.get('/', async (req, res) => {
  res.send('Hello, kind gentlemans!');
});

bootstrap().then(() => {
  app.listen(port, () => {
    console.log(`Application is listening port ${port}`);
  });
});
