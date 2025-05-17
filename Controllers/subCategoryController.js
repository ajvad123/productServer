const subcategories = require('../Model/subCategoryModel')

exports.addsubCategory = async (req, res) => {

    const { cat, subCat } = req.body
    console.log(cat, subCat);

    try {
        const newSubCat = new subcategories({
            cat, subCat
        })
        await newSubCat.save()
        res.status(201).json(newSubCat)
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Failed to add SubCategory",
            error: err.message,
            details: err.errors
        });
    }
}


exports.getAllSubcat = async (req, res) => {

    try {
        const subcat = await subcategories.find()
        res.status(201).json(subcat)
    } catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}