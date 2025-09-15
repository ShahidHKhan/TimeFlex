import express from "express";
import { ENV } from "./config/env.js";
import {db} from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { and, eq} from "drizzle-orm";
import job from "./config/cron.js";

const app = express();
const PORT = ENV.PORT || 5001;

if (ENV.NODE_ENV === "production") job.start();

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({success:true})
});

app.post("/api/favorites", async (req, res) => {
    try{
        const { userId, stretchId, name, image, reps, muscleGroup} = req.body;

        if(!userId || !stretchId || !name) {
            return res.status(400).json({ error: "Missing required feilds"});
        }

        const newFavorite = await db.insert(favoritesTable).values({
            userId,
            stretchId,
            name,
            image,
            reps,
            muscleGroup
        })
        .returning();

        res.status(201).json(newFavorite[0])
    }   catch (error) {
        console.log("Error adding favorite", error)
        res.status(500).json({error:"something went wrong"});
    }
});

app.get("/api/favorites/:userId", async (req, res) => {
    try{
        const {userId} = req.params;

        const userFavorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId,userId));

        res.status(200).json(userFavorites);
    } catch (error) {
       console.log("Error fetching favorites", error)
    res.status(500).json({error:"something went wrong"}); 
    }
})

app.delete("/api/favorites/:userId/:stretchId", async (req, res) => {
    try{ 
        const {userId, stretchId} = req.params

        await db.delete(favoritesTable).where(
            and(eq(favoritesTable.userId,userId), eq(favoritesTable.stretchId, parseInt(stretchId)))
        )

        res.status(200).json({ message: "Favorite removed successfully"});

    } catch (error){
        console.log("Error removing favorite", error)
        res.status(500).json({error:"something went wrong"});
    }

});

app.listen(PORT, () => {
    console.log("Server is running on PORT: ", PORT);
});