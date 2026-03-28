import userModel from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) 
  {
    console.error("getCurrentUser error:", error);
    return res.status(500).json({ message: "getCurrentUser failed" });
  }
};
