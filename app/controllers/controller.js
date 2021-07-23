const { product,category } = require('../../models/mongose.js');
const mongoose=require('mongoose')
exports.create= (req,res)=>{
    const cat=new category({
        categoryId :new mongoose.Types.ObjectId(),		// Category ID
        categoryName : req.body.categoryName  
 
    })
    cat.save().then(data => {
        const prod=new product({
            productID: new mongoose.Types.ObjectId(),
            productName : req.body.productName || "unititled product",		// Product Name
            qtyPerUnit : req.body.qtyPerUnit,		// Quantity of the Product
            unitPrice : req.body.unitPrice,			// Unit Price of the Product
            unitInStock : req.body.unitInStock,		// Unit in Stock
            discontinued :  req.body.discontinued,
            category:data.categoryId
        })
        prod.save().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
        });
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });
    
    
};
exports.findAll= (req,res)=>{
product.find().then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retriving the products."
    });
});
};
exports.update= (req,res)=>{

    // if(!req.body.content){
    //     return res.status(400).send({
    //         message:"Content can not be empty"
    //     });
    // }
    product.findOneAndUpdate(req.params.prodId,{
        productName : req.body.productName || "unititled product",		// Product Name
        qtyPerUnit : req.body.qtyPerUnit,		// Quantity of the Product
        unitPrice : req.body.unitPrice,			// Unit Price of the Product
        unitInStock : req.body.unitInStock,		// Unit in Stock
        discontinued :  req.body.discontinued,
        categoryName : req.body.categoryName,
    },{new:true}).then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.noteId
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.noteId
        });

});
};
exports.delete= (req,res)=>{
product.findByIdAndRemove(req.params.prodId).then(note => {
    // if(!note) {
    //     return res.status(404).send({
    //         message: "product not found with id " + req.params.noteId
    //     });
    // }
    res.send({message: "product deleted successfully!"});
}).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "product not found with id " + req.params.noteId
        });                
    }
    return res.status(500).send({
        message: "Could not delete product with id " + req.params.noteId
    });
});
};


