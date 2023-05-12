import app from "./api.routes.ts";
import '../database/db.ts'

app.listen(3001, () => {
  console.log("Express API listening on port 3001!");
});