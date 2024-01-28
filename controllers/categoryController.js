import categoryModels from "../models/categoryModels.js";
import slugify from 'slugify'
export const createCategoryController = async(req,res) =>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message: "name is required"})
        }
        const isExist = await categoryModels.findOne({name});
        if(isExist){
            return res.status(200).send({
                success: true,
                message: "category already exist"
            })
        }
        else{
            const category = await new categoryModels({name, slug:slugify(name)}).save;
            res.status(201).send({
                success: true,
                message: 'new category created',
                category
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "some error in category",
            error
        })
    }
};

export const updateCategoryController = async(req,res) =>{
   try {
    const {name} = req.body
    const {id} = req.params
    const category = await categoryModels.findByIdAndUpdate(id,{name, slug: slugify(name)},{new: true});
    res.status(200).send({
        success:true,
        message: 'category updated successfully',
        category
    })
    

   } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "some error in updating category",
        error,
      });
   }
}

// get all category
export const categoryController = async(req,res) =>{
    try {
        const category = await categoryModels.find({});
        return res.status(200).send({
            success: true,
            message: "All categories list",
            category
        });
    } catch (error) {
        return res.status(500).send({
          success: false,
          message: "some error in getting all category",
          error,
        });
    }
}


// singlr category

export const singleCategoryController = async(req,res) => {
    try {
        const {slug} = req.params.slug
        const category = await categoryModels.findOne({slug});
         return res.status(200).send({
           success: true,
           message: "single categories got",
           category,
         });
    } catch (error) {
        return res.status(500).send({
          success: false,
          message: "some error in getting category",
          error,
        });
    }
}

//delete category
export const deleteCategoryController = async(req,res) => {
    try {
        const {id} = req.params
        await categoryModels.findByIdAndDelete(id);
        return res.status(201).send({
            success: true,
            message: "category deleted",
        });
    } catch (error) {
        return res.status(500).send({
          success: false,
          message: "some error in deleting category",
          error,
        });
    }
}