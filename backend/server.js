import express from "express"
import { env } from "./src/config/env.js"
import { db } from "./src/config/db.js"

const app = express()
const PORT = env.PORT

app.listen(PORT, () => {
    console.log(`Serveur tourne sur localhost:${PORT}`);

})