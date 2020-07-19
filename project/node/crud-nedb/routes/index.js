var express = require('express');
var router = express.Router();

// setup database
const Datastore = require('nedb');

const db = new Datastore({filename: 'data.db'})

db.loadDatabase((err) => {
	if (err) throw err;
	console.log('[+] database: on')
})

const create = (name, type, price, description) => {
	db.insert(name, type, price, description, (err, result) => {
		if (err) throw err;
	})
}

const read = (callback) => {
	db.find({}, (err, result) => {
		const data = {
			data: result
		}
		callback(undefined, {
			data: data
		})
	})
}

/* GET home page. */
router.get('/', (req, res, next) => {
	read((error, { data } = {}) => {
		console.log(data)
		res.render('index', { title: 'merintis | CRUD neDB', dataDB: data.data});
	})
});

router.get('/edit/:id', (req, res, next) => {
	read((error, { data } = {}) => {
		db.findOne({ _id: req.params.id }, (err, result) => {
			if (err) throw err;
			console.log(result.name)
			res.render('edit', { title: 'merintis | CRUD neDB', dataList: data.data, dataUpdate: result});
		})
	})
})

router.get('/edit', (req, res, next) => {
	read((error, { data } = {}) => {
		res.render('edit', { title: 'merintis | CRUD neDB', dataList: data.data});
	})
})


router.post('/update/:id', (req, res, next) => {
	var dataAdd = {
		name: req.body.name,
		type: req.body.type,
		price: req.body.price,
		description: req.body.description
	}
	var param = req.params.id
	db.update({ _id: param }, { $set: dataAdd }, (err, result) => {
		console.log(result)
	})
	res.redirect(`/edit/${param}`)
})

router.post('/add', (req, res, next) => {
	var dataAdd = {
		name: req.body.name,
		type: req.body.type,
		price: req.body.price,
		description: req.body.description
	}
	db.insert(dataAdd, (err, result) => {
		if (err) throw err;
	})
	res.redirect('/')
})

router.post('/delete/:id', (req, res, next) => {
	var data = req.params.id
	
	db.remove({_id: data}, {}, (err, result) => {
		if (err) throw err;
		console.log(result)
	})
	res.redirect('/')
})
module.exports = router;
