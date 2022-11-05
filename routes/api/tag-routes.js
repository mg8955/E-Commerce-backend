const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find all tags include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
  });    
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

// find a single tag by its `id` include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json(err);
  } 
});

// create a new tag
router.post('/', (req, res) => {
  
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const delTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!delTag) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
