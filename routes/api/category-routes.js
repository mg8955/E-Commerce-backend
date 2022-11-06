const router = require('express').Router();
const { Category, Product } = require('../../models');

// find all categories including its associated Products
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{model: Product}]
  });    
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value including its associated Products
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(404).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update route for category on 'id value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(cat => {
    if (!cat[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
    }
    res.json(cat);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

// Delete route for category on 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const delCat = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!delCat) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(delCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
