const _ = require('lodash')
const { UserGroup, Customer, ShippingRegion } = require('../sequelize')

exports.publicUser = _user => {
  const user = _.pick(_user.dataValues, ['user_id', 'email', 'username', 'Customer'])
  user.groups = _user.UserGroups.map(group => group.group)
  user.admin = user.groups.includes('admin')
  return user
}

exports.internalUser = user => {
  user.groups = user.UserGroups.map(group => group.group)
  user.admin = user.groups.includes('admin')
  return user
}

exports.userInclude = () => [
  {
    model: UserGroup
  },
  {
    model: Customer,
    include: [
      {
        model: ShippingRegion
      }
    ]
  }
]