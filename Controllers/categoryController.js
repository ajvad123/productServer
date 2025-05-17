const Categories = require('../Model/categoryModel')

exports.addCategory = async (req, res) => {

    const { NCategory } = req.body
    console.log(NCategory);


    try {
        const newCategory = new Categories({ NCategory })

        await newCategory.save()
        res.status(201).json(newCategory)
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Failed to add Category",
            error: err.message, 
            details: err.errors
        });
    } 

}
 
exports.getallCategory = async (req, res) => {

    try {
        const categoies = await Categories.find()
        res.status(201).json(categoies)
    } catch (err) {
        console.log(err)
        res.status(404).json(err) 
    }
}   