import { env } from "./src/config/env.js";
import app from "./src/app.js";

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur tourne sur localhost:${PORT}`);
});