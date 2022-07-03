require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')

//midlleware that prevents CORS error due the different ports of server and client
app.use(cors())

//buitin express middleware that attaches the posted object to the body of the request
app.use(express.json())

//get all restaurants, their average_rating and their total ratings
app.get('/api/restaurants', async (_, res) => {
    try {
        const results = await db.query(
                'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, TRUNC(AVG(rating), 1) AS average_rating, COUNT(id) AS total_ratings FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;'
            )

        res.status(200).json({
        status: "success",
        results: results.rows.length,
        restaurants: results.rows
    })
    } catch (error) {
        console.log(error)
    }   
})

//get individual restaurant, its average_rating, its total ratings and all of its reviews
app.get('/api/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await db.query(
            'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, TRUNC(AVG(rating), 1) AS average_rating, COUNT(id) AS total_ratings FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;',
            [req.params.id]
        )

        const reviews = await db.query(
            'SELECT * FROM reviews WHERE restaurant_id = $1;',
            [req.params.id]
        )
        
        res.status(200).json({
        status: 'success',
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
    })
    } catch (error) {
        console.log(error)
    }
})

//create individual restaurant
app.post('/api/restaurants', async (req, res) => {
    try {
        const newRestaurant = await db.query(
            'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;',
            [req.body.name, req.body.location, req.body.price_range]            
        )

        res.status(201).json({
        status: 'success',
        restaurant: newRestaurant.rows[0]
    })
    } catch (error) {
        console.log(error)
    }    
})

//update individual restaurant
app.put('/api/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query(
            'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;',
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        )
        
        res.status(200).json({
        status: 'success',
        restaurant: results.rows[0]
    })
    } catch (error) {
        console.log(error)
    }    
})

//delete individual restaurant
app.delete('/api/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query(
            'DELETE FROM restaurants WHERE id = $1;',
            [req.params.id]
        )
        
        res.status(204).json({
            status: "success"
        })
    } catch (error) {
        console.log(error)
    }    
})

//create individual review
app.post('/api/restaurants/:id/reviews', async (req, res) => {
    try {
        const newReview = await db.query(
            'INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;',
            [req.params.id, req.body.name, req.body.review, req.body.rating]            
        )

        res.status(201).json({
            status: 'success',
            review: newReview.rows[0]
        })
    } catch (error) {
        console.log(error)
    }
})

//delete individual review
app.delete('/api/restaurants/:id/reviews/:reviewId', async (req, res) => {
    try {
        const results = await db.query(
            'DELETE FROM reviews WHERE id = $1;',
            [req.params.reviewId]
        )

        res.status(204).json({
            status: "success"
        })
    } catch (error) {
        console.log(error)
    }
})

//setting up port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
})