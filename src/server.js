const app = require("./app.js");
const PORT = process.env.DB_PORT || 3000;

app.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT} ${new Date()}`);
});
