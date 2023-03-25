var express = require('express');
var router = express.Router();
const inventoryController = require('../controller/inventoryController')

/* GET /items listing. */
router.get('/', inventoryController.items_list);



// Category
router.get('/category', inventoryController.category_list);

module.exports = router;
