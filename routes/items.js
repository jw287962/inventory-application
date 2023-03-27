var express = require('express');
var router = express.Router();
const inventoryController = require('../controller/inventoryController')

/* GET /items listing. */
router.get('/items', inventoryController.items_list);
router.get('/', () => {
  res.redirect('/category/items')
});

router.get('/item/:id', inventoryController.view_item);

// Category
router.get('/category', inventoryController.category_list);

module.exports = router;
