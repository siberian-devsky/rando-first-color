// server/server.js
import { createApp } from "./app.js";

const port = 8000;

createApp().then(app => {
  app.listen(port, () => console.log(`App running on port ${port}`));
});
