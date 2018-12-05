// NODE MODULES IMPORTED
const express = require('express');
const db = require('./data/db.js');
const server = express();
const parser = express.json();
const PORT = 8000;
server.use(parser);





//ENDPOINTS

// SERVER GET REQUEST
server.get('/posts' , (req, res) => {
    db.find()
        .then((posts) => {
    //SEND
            res.json(posts)
        })
        .catch(err => {
            res
            .status(500)
            .json({ error: "The posts information could not be retrieved." })
        });
})

//SERVER GET REQUEST BY ID
server.get('/posts/:id', (req, res) => {
    
    //DEFINING ID AS REQUIRED PARAMETER
    const { id } = req.params;
    db.findById(id)
        .then(posts => {
            if (posts) {
                res.json(posts);
            } else {
                res
                    .status(500)
                    .json({error: "The post information could not be retrieved."})
            }
        })
        .catch(err => {
            res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." })
        })
 
})

//SERVER POST REQUEST
server.post('/users', (req, res) => {
    const user = req.body;

    if (user.title && user.contents) {
        db.insert(user)
            .then(idInfo => {
                db.findById(idInfo.id)
                    .then(user => {
                        res
                            .status(201)
                            .json(user);
                    });
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "There was an error while saving the post to the database" });
            });
    } else {
            res
                .status(400)
                .json({message: "Please provide title and contents for the post."})


        }
})

//SERVER DELETE REQUEST

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    console.log('id', id);
        db.remove(id)
        .then(count => {
            if (count) {
                res
                    .json({ message: "Successufully Deleted" });
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." });
                
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The post could not be removed" });
        })
})


//SERVER PUT REQUEST

server.put('api/posts/:id', (req, res) => {

    const posts = req.body;
    const { id } = req.params;
    if (posts.title && posts.contents) {
        db.update(id, posts)
            .then(count => {
                if (count) {
                    db.findById(id)
                        .then(posts => {
                        res.json(posts)
                    })
                } else {
                    res
                        .status(404)
                    .json({message: "The post with the specified ID does not exist."})
                        
            }
            }).catch(err => {
                res
                    .status(500)
                    .json({ error: "The post information could not be modified." });
        })
    } else {
        res
            .status(400)
            .json({errorMessage: "Please provide title and contents for the post."})
    }
})


//SERVER IS LISTENING ON PORT 8000
server.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    });