import Problem from '../models/Problem.js';

const verifyCreator = async (req, res, next) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        if (problem.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized action' });
        }

        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default verifyCreator;
