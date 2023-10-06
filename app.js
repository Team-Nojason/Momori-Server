import express from 'express';

const app = express();
const port = 3000;

app.get('/hello-world',(req, res) => {
    res.send('hello world!');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
