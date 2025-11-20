import User from "../model/User.js"

//All developers list

export const getAllDevelopers = async (req, res) =>{
    const { search, skill } = req.query;

    let filter = {};

    if (search){
        filter.name = {$regex:search,$options: "i"};
    }

   if (skill) {
    filter.skills = { $regex: skill, $options: "i" };
  }

  const devs = await User.find(filter)
  .select("password")
  .limit(100)
  .sort({createdAt: -1 })

  res.json(devs);
}

//single developer profile 

export const getDeveloperProfile = async (req, res)=>{
    const dev = await User.findById(req.params.id)
    .select("-password");

    if(!dev) return res.json({
        message: "Developer not found"
    });

    res.json(dev);
}