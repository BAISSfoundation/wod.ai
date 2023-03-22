const wod = require('../index')
new wod().request({
  model: "7B",
  prompt: "If aliens were actually time travlers from the future,",
  n_predict: 400
}, (msg) => {
  process.stdout.write(msg)
})
