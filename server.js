require('dotenv').config();

const express = require('express');
const data = require('./data.json');

const app = express();

app.get('/recommended', (_, res) => {
    res.status(200).json(data.filter(el => !el.isTrending));
})

app.get('/movies', (_, res) => {
    res.status(200).json(data.filter(el => el.category === 'Movie'));
});

app.get('/series', (_, res) => {
    res.status(200).json(data.filter(el => el.category === 'TV Series'));
});

app.get('/trending', (_, res) => {
    res.status(200).json(data.filter(el => el.isTrending));
});

app.get('/bookmarked', (_, res) => {
    res.status(200).json(data.filter(el => el.isBookmarked));
});

app.get('/search', (req, res) => {
    const query = new RegExp(req.query?.query, 'i');

    res.status(200).json(data.filter(el => query.test(el.title)));
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
