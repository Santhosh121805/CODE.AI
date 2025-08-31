import User from "../models/User.js";

export const connectWallet = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    if (!walletAddress) return res.status(400).json({ message: "Wallet required" });

    let user = await User.findOne({ walletAddress });
    if (!user) user = await User.create({ walletAddress });

    res.json({ message: "Wallet connected", walletAddress: user.walletAddress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
