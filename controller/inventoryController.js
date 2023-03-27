const Category = require('../models/Category');
const Items = require('../models/Items');
// for forms
const {body, validationResult} = require('express-validator');

exports.category_list = (req,res) => {

}

exports.view_item = (req,res) => {
    res.send('set up view item')
}

exports.items_list = async (req, res) => {
  const result = await Items.find()  
    .sort({category: 1})
    .populate("category")

   
  res.render('item_list', {
          title: 'Items List',
          items: result,
        })
    // .exec( function (err, list_items){
    //     if(err) {
    //       return next(err);
    //     }

    //     res.render('item_list', {
    //       title: 'Items List',
    //       items: list_items,
    //     })
        
    // })

}