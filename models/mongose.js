const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const ProductSchema=new Schema({
productID: Schema.Types.ObjectId,   		// Product ID
productName : String,		// Product Name
qtyPerUnit : Number,		// Quantity of the Product
unitPrice : Number,			// Unit Price of the Product
unitInStock : Number,		// Unit in Stock
discontinued :  Boolean,		// Boolean (yes/no)
category:[{ 
    type: Schema.Types.ObjectId, 
    ref: 'Category' }]

});
const CategorySchema=new Schema({
   		// Category Name
           categoryId : Schema.Types.ObjectId,		// Category ID
           categoryName : String,	  
    

});
const product=mongoose.model('Product',ProductSchema)
const category=mongoose.model('Category',CategorySchema)

module.exports={product,category}