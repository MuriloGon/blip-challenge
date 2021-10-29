import app from './Server';

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`Listening port: ${PORT}`));
