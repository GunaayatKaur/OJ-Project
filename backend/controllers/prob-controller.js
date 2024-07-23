import Problem from "../models/Problem.js";

export const create = async(req, res) => {
    try {
        const { pname, description, difficulty} = req.body;
        if(!(pname && description && difficulty)){
            return res.status(400).json({message: "Please enter all the required fields"});
        }
        const probData = new Problem({
            pname,
            description,
            difficulty
        });

        const savedData = await probData.save();
        res.status(201).json({message: "Problem created successfully"});
    } catch (error) {
        console.error("Error creating problem:", error);
        res.status(500).json({error: error.message});
    }
}

export const getAll = async(req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        console.error("Error creating problem:", error);
        res.status(500).json({error: error.message});
    }
}

export const getOneProblem = async(req, res) => {
    try {
        const id = req.params.id;
        const existingProblem = await Problem.findById(id);
        if (!existingProblem){
            return res.status(401).json({ message: "Problem not found!" });
        }
        res.status(200).json(existingProblem);
    } catch (error) {
        console.error("Error creating problem:", error);
        res.status(500).json({error: error.message});
    }
}

export const update = async(req, res) => {
    try {
        const id = req.params.id;
        const existingProblem = await Problem.findById(id);
        if (!existingProblem){
            return res.status(401).json({ message: "Problem not found!" });
        }

        const updatedProblem = await Problem.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({message: "Problem updated successfully"});
    } catch (error) {
        console.error("Error creating problem:", error);
        res.status(500).json({error: error.message});
    }
}

export const deleteProblem = async(req, res) => {
try {
    const id = req.params.id;
    const existingProblem = await Problem.findById(id);
    if (!existingProblem){
        return res.status(401).json({ message: "Problem not found!" });
    }
    await Problem.findByIdAndDelete(id);
    res.status(200).json({message: "Problem successfully deleted"});
} catch (error) {
    console.error("Error creating problem:", error);
    res.status(500).json({error: error.message});
}
}
