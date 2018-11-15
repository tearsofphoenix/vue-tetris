const hanzi = require('hanzi')
const {tryToCompose} = require('./words')
hanzi.start()

const {components} = hanzi.decompose('百', 1)
console.log(components, hanzi.decompose('百', 2), tryToCompose('一', '白'))
