const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todoList: [{type: Types.ObjectId, ref: 'Todos'}]
})

module.exports = model('User', schema)