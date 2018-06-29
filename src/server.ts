import * as express from 'express';

const app = express();

app.get('/login', (req, res, next) => {
    console.log('TODO');
});

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});