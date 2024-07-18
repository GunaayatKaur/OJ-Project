const logout = async(req,res) => { 
    try {
        const tokenExist = req.cookies.token;
        if(!tokenExist){
            return res.status(400).json({message: "Login in required"});
        }

        res.clearCookie("token");
        res.status(200).json({message: "Logout successfull"});
    } catch (error) {
        console.log(error);
    }
}

export default logout;