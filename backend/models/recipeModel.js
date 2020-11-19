const mongoose= require ('mongoose');

const Schema = mongoose.Schema;

const recipeSchema= new Schema ({
    image:{type: String,required: true},
    title: {type: String,required: true},
    cuisine: {type:String,required: true},
    servings: {type: Number,required: true},
    time: {type: Date},
    ingredients: [ingredientsSchema],
    description:{type:String,required: true},
    nutrition: nutritionSchema,

})
const ingredientsSchema= new Schema ({
    product: {type:String,required: true},
    quantity: {type:Boolean,required: true}
})

const nutritionSchema= new Schema ({
    calories: {type:Number},
    fat:{type:Number},
    carbs: {type:Number},
    protein:{type:Number}
    
})

module.exports = mongoose.model("Recipe", recipeSchema);
