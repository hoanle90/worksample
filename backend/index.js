const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/productRoutes");

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Mock API running at http://localhost:${PORT}`));
