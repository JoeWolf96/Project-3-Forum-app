const express = require('express');
const topics = express.Router();
const topicModel = require('../models/topicModel');



// GET (index) list of holidays
topics.get('/', (req, res)=>{
	// res.send('Get route is working!!!');

	usersModel.findById(req.session.currentUser._id, (error, foundUser)=>{
		if (error){
			res.status(400).json(error)
		}
		else{

			res.status(200).json(foundUser.topics)
		}
	}).populate('Topics')

});


// POST ROUTE
topics.post('/', (req, res)=>{
	console.log(req.session.currentUser);

	topicModel.create(req.body, (error, createTopic)=>{
		if (error){
			res.status(400).json({error: error.message})
		}
		else{

			usersModel.findById(req.session.currentUser._id, (error, foundUser)=>{
				if (error) {
					res.status(400).json({ error: error.message })
				}
				else{
					foundUser.favHolidays.push(createTopic)
					foundUser.save()
					res.status(201).json(createTopic)
				}
			})
		}
	})
});


// DELETE ROUTE
topics.delete('/:id', (req, res)=>{

	topicModel.findByIdAndDelete(req.params.id, (error, deletedTopic)=>{
		if (error){
			res.status(400).json({error: error.message})
		}
		else if (deletedTopic === null){
			res.status(404).json({message: 'Topic id not Found'})
		}
		else{
			res.status(200).json({message: `Topic ${deletedTopic.name} deleted successfully`})
		}
	})
})


// UPDATE ROUTE
topics.put('/:id', (req, res)=>{

topicsModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedTopic)=>{
		if (error){
			res.status(400).json({error: error.message})
		}
		else{
			res.status(200).json({
				message: `Holiday ${updatedTopic.id} updated successfully`,
				data: updatedTopic
			})
		}
	})
})

// PATCH ROUTE increments numbers of likes
topics.patch('/addlikes/:id', (req, res)=>{

	topicModel.findByIdAndUpdate(req.params.id, { $inc: { likes : 1} }, {new:true}, (error, updatedTopic)=>{
		if (error){
			res.status(400).json({error: error.message})
		}
		else{
			res.status(200).json({
				data: updatedTopic
			})
		}
	})
})

module.exports = topics;
