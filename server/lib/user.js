const _ = require('lodash')

exports.publicUser = _user => {
  const user = _.pick(_user.dataValues, ['user_id', 'email', 'username'])
  user.groups = _user.UserGroups.map(group => group.group)
  return user
}

exports.internalUser = user => {
  user.groups = user.UserGroups.map(group => group.group)
  user.admin = user.groups.includes('admin')
  return user
}