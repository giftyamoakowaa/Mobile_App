import Story from "../models/Story.js";
import User from "../models/User.js";
import { sendPushNotification } from "../firebaseConfig.js";
import { sendEmailNotification } from "../emailService.js";

// Add Story (Only Admin)
export const addStory = async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id; // Get user ID from auth middleware
  
      // Check if user is an admin (Only you, the owner, can add stories)
      const user = await User.findById(userId);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Only admin can add stories." });
      }
  
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }
  
      const newStory = new Story({ title, content, author: userId });
      await newStory.save();
  
      // Send notifications to all users
      const users = await User.find({ role: "user" }); // Get all users
      const emails = users.map(user => user.email);
      const tokens = users.map(user => user.pushToken).filter(Boolean); // Get valid push tokens
  
      if (emails.length > 0) {
        await sendEmailNotification(emails, "New Story Available", `Check out our latest story: ${title}`);
      }
  
      if (tokens.length > 0) {
        await sendPushNotification(tokens, "New Story Alert!", `A new story "${title}" has been posted.`);
      }
  
      res.status(201).json({ message: "Story added successfully", story: newStory });
    } catch (error) {
      console.error("Error adding story:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


export const getAllStories = async (req, res) => {
    try {
      const stories = await Story.find().populate("author", "email");
      res.status(200).json(stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  
  export const getStoryById = async (req, res) => {
    try {
      const story = await Story.findById(req.params.id).populate("author", "email");
  
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
  
      res.status(200).json(story);
    } catch (error) {
      console.error("Error fetching story:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  
  export const updateStory = async (req, res) => {
    try {
      const { title, content } = req.body;
      const story = await Story.findById(req.params.id);
  
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
  
      // Check if the logged-in user is the owner of the story
      if (story.author.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not authorized to edit this story" });
      }
  
      // Update story details
      story.title = title || story.title;
      story.content = content || story.content;
      await story.save();
  
      res.status(200).json({ message: "Story updated successfully", story });
    } catch (error) {
      console.error("Error updating story:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  
  export const deleteStory = async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);
  
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
  
      // Check if the logged-in user is the owner of the story
      if (story.author.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not authorized to delete this story" });
      }
  
      await story.deleteOne();
      res.status(200).json({ message: "Story deleted successfully" });
    } catch (error) {
      console.error("Error deleting story:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  