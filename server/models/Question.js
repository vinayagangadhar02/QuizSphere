import mongoose from 'mongoose'

const questionSchema=new mongoose.Schema({
      subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
      question:{type:String,required:true},
      answers:{type:[String],required:true},
      correctAnswer:{type:String,required:true}
})

const Question=mongoose.model('Question',questionSchema);
export default Question