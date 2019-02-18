const _ = require('lodash')

exports.publicUser = (_user) => {
  const user = _.pick(_user.dataValues, ['user_id', 'email', 'username'])
  user.groups = _user.Groups.map(group => group.name)
  return user
}
