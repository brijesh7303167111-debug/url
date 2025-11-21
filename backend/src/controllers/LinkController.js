import { Link } from "../models/Link.js";
import { generateCode } from "./CodeGenerator.js";


export const createLink = async (req, res) => {
  try {
    const { url, code } = req.body;

    
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }
    console.log("createLink func called :", { url, code });

    // If user gave a custom code → check if exists
    if (code) {
      const exists = await Link.findOne({ code });
      if (exists) {
        return res.status(409).json({ message: "Custom code already exists" });
      }

      console.log("createLink func when code by user exists :", { url, code });

      const link = await Link.create({ url, code });

      console.log("link save hogya when user gave code ", { url, code });
      return res.status(201).json(link);
    }

    // Auto-generate code if not provided
    console.log("newcode se phle");
    let newCode;
    while (true) {
      newCode = generateCode();
      const exists = await Link.findOne({ code: newCode });
      if (!exists) break; // unique
    }
     
    console.log("createLink func server gave code :", { url, newCode });
    const link = await Link.create({ url, code: newCode });
     console.log("link save hogya when server gave code ", { url, newCode });
     
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// List all links
export const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Stats for a single code
export const codeDetail = async (req, res) => {
  const { code } = req.params;
  try {
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).json({ message: "Link not found" });
    res.json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Redirect and increment clicks
export const reDirect = async (req, res) => {
  const { code } = req.params;
  try {
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).json({ message: "Link not found" });

    link.clicks = (link.clicks || 0)+1;
    link.lastClicked = new Date();
    await link.save();

    res.json({ url: link.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete link
export const deletecode = async (req, res) => {
  const { code } = req.params;
  try {
    const link = await Link.findOneAndDelete({ code });
    if (!link) return res.status(404).json({ message: "Link not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
