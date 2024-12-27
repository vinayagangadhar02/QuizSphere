import mongoose from 'mongoose';

const subjectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true,
      },
})

const Subject=mongoose.model('Subject',subjectSchema);
export default Subject;
