const express = require('express');
const redis = require('redis');

const app = express();

// represent connection to redis server
const client = redis.createClient({
    // usually host: 'https://my-redis-server.com:port'
    // we can automatically call the service from docker-compose
    host: 'redis-server'
    // defaults
    // port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        // what we get in redis is string not automatically an integer
        res.send('Number of Visits is ' + visits);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8081, () => {
    console.log('listening to port 8081');
});