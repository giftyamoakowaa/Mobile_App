import express from "express";
import { addStory,getAllStories,getStoryById,updateStory, deleteStory} from "../controllers/storyController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const storyRouter = express.Router();

storyRouter.post("/add", verifyToken, addStory);
storyRouter.get("/", getAllStories);
storyRouter.get("/:id", getStoryById);
storyRouter.put("/:id", verifyToken, updateStory);
storyRouter.delete("/:id", verifyToken, deleteStory);

export default storyRouter;