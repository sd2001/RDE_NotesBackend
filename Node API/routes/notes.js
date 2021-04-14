const express = require('express')
const Schema = require('../models/schema')
const router = express.Router()

var Note = Schema.note_model

router.get('/', async (req, res) => {
	try {
		const notes = await Note.find({})
		if (!notes) {
			return res.status(400).send({
				message: "Data Not Found"
			});
		}
		else res.send(notes)
	}
	catch (err) {
		res.status(404).send(err)
	}

})

router.post('/create', async (req, res) => {
	const note = new Note({
		userid: req.body.userid,
		title: req.body.title,
		description: req.body.description
	});
	// console.log(note)

	try {
		await note.save()
		res.send(note)
	}
	catch (error) {
		res.status(406).json({ message: error })
	}
})

router.get('/:pk', async (req, res) => {
	try {
		const note = await Note.findById(req.params.pk)
		if (!note) {
			return res.status(400).send({
				message: "Data Not Found"
			});
		}
		else
			res.status(200).send(note)
	}
	catch (err) {
		res.status(500).json({ message: err })
	}
})

router.get('/user/:pk', async (req, res) => {
	try {
		const usernote = await Note.find({ userid: req.params.pk })
		if (!usernote) {
			return res.status(400).send({
				message: "Data Not Found"
			});
		}
		else
			res.status(200).send(usernote)
	}
	catch (err) {
		res.status(500).json({ message: err })
	}
})

router.put('/:pk', async (req, res) => {
	{
		if (!req.body) {
			return res.status(400).send({
				message: "Data to update can not be empty!"
			});
		}
		try {
			const updated = await Note.findOneAndUpdate(req.params.pk,
				req.body, { useFindAndModify: false })
			res.status(200).send(updated)
		}
		catch (err) {
			res.status(500).json({ message: err })
		}
	}
})

router.delete('/:pk', async (req, res) => {
	try {
		const deleted = await Note.remove({ _id: req.params.pk })
		if (!deleted) {
			return res.status(400).send({
				message: "Data Not Found"
			});
		}
		res.status(200).send(deleted)
	}
	catch (err) {
		res.status(500).json({ message: err })
	}
})

module.exports = router