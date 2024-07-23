import mongoose from 'mongoose';

const ProblemSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    }
}
);

const Problem = mongoose.model('Problem', ProblemSchema);
export default Problem;