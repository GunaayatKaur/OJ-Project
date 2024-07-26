import mongoose from 'mongoose';

const TestCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  }
});

const TestCase = mongoose.model('TestCase', TestCaseSchema);

export default TestCase;
