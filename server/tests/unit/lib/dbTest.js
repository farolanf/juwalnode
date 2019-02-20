const db = require('../../../sequelize')
const { addIncludes } = require('../../../lib/db')

describe('db lib', () => {

  function populate () {
    return Promise.all([
      db.Department.bulkCreate([
        { department_id: 1, name: 'Department 1', description: 'Department 1 description' },
        { department_id: 2, name: 'Department 2', description: 'Department 2 description' },
      ], { logging: false }),
      db.Category.bulkCreate([
        { category_id: 1, department_id: 1, name: 'Category 1', description: 'Category 1 description' },
        { category_id: 2, department_id: 2, name: 'Category 2', description: 'Category 2 description' },
      ], { logging: false }),
      db.Product.bulkCreate([
        { product_id: 1, name: 'Product 1', description: 'Product 1 desc', price: 10 },
        { product_id: 2, name: 'Product 2', description: 'Product 2 desc', price: 10 },
      ], { logging: false }),
      db.ProductCategory.bulkCreate([
        { product_id: 1, category_id: 1 },
        { product_id: 2, category_id: 2 },
      ], { logging: false })
    ])
  }

  describe('addIncludes', () => {

    beforeEach(() => {
      return Promise.all([
        db.Department.truncate({ logging: false }),
        db.Category.truncate({ logging: false }),
        db.Product.truncate({ logging: false }),
        db.ProductCategory.truncate({ logging: false }),
      ])
    })

    it('build include', async () => {
      const context = {}
      const expected = {
        include: [
          {
            model: db.Category,
            where: { name: 'Category 2' }
          }
        ]
      }
      await populate()
      await addIncludes(['category', 'name'], 'Category 2', context, db)
      assert.isArray(context.include)
      assert.equal(context.include[0].model, expected.include[0].model)
      assert.deepEqual(context.include[0].where, expected.include[0].where)
    })

    it('build include nested', async () => {
      const context = {}
      const expected = {
        include: [
          {
            model: db.Category,
            include: [
              {
                model: db.Department,
                where: { name: 'Department 2' },
              }
            ]
          }
        ]
      }
      await populate()
      await addIncludes(['category', 'department', 'name'], 'Department 2', context, db)

      assert.isArray(context.include)
      assert.equal(context.include[0].model, expected.include[0].model)

      assert.isArray(context.include[0].include)
      assert.equal(context.include[0].include[0].model, expected.include[0].include[0].model)
      assert.deepEqual(context.include[0].include[0].where, expected.include[0].include[0].where)
    })

    it('support multi query', async () => {
      const context = {}
      const expected = {
        include: [
          {
            model: db.Category,
            where: { name: 'Category 1' },
            include: [
              {
                model: db.Department,
                where: { name: 'Department 2' },
              }
            ]
          }
        ]
      }
      await populate()
      await addIncludes(['category', 'name'], 'Category 1', context, db)
      await addIncludes(['category', 'department', 'name'], 'Department 2', context, db)

      assert.isArray(context.include)
      assert.equal(context.include[0].model, expected.include[0].model)
      assert.deepEqual(context.include[0].where, expected.include[0].where)

      assert.isArray(context.include[0].include)
      assert.equal(context.include[0].include[0].model, expected.include[0].include[0].model)
      assert.deepEqual(context.include[0].include[0].where, expected.include[0].include[0].where)
    })
  })
})