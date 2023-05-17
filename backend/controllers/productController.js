const Product=require("../models/productModels")

// Create Product 
exports.createProduct=async(req,res)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}
//get all Product
exports.getAllProducts=async(req,res)=>{
    const products=await Product.find();
 res.status(200).json({success:true,products});
}

//get product details
exports.getProductDetails=async(req,res,next)=>{
    let product=await Product.findById(req.params.id)
    console.log(product)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }
    res.status(200).json({
        success:true,
        product
    })

}

//update product

exports.updateProduct=async(req,res)=>{
    let product=await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false})
    
    res.status(200).json({
        success:true,
        product
    })

}

//delete Products

exports.deleteProduct=async(req,res)=>{
    let product=await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }
     product=await Product.findOneAndRemove(req.params.id);
    
    res.status(200).json({
        success:true,
        product,
        Message:"Product Deleted Successfully"
    })
}