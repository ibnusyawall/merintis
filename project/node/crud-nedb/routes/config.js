const Datastore = require('nedb');

const db = new Datastore({filename: 'data.db'})

db.loadDatabase((err) => {
	if (err) throw err
		console.log('[+] database: on')
})

// create
const create = (name, type, price, description, callback) => {
	db.insert(name, type, price, description, (err, result) => {
		if (err) throw err;
		callback(undefined, {
			data: 'success'
		})
	})
}

// read
const read = (callback) => {
	db.find({}, (err, result) => {
		const data = {
			data: result
		}
		//console.log(data)
		callback(undefined, {
			data: data
		})
	})
}
// update

// delete
/*for (i in 'ab') {
	create(`book-${i}`, 'list', 10000, 'many book', (error, {data} ={})=> {
		console.log(data)
	})
}*/

// read((error, { data } = {}) => {
// 	console.log(data.data)
// })

module.exports = { create, read }