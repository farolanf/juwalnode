exports.handleError = function handleError (err, res) {
  // eslint-disable-next-line
  console.error(err)
  res.sendStatus(500)
}
