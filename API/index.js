import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"

const prisma = new PrismaClient()
const app = express()

app.set("port", process.env.PORT || 4000)
app.set("json spaces", 2)

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// todo: move to /routes

app.get("/v1/", (req, res) => {
  res.json({
    Title: "Estamos operativos, por el momento",
  })
})

app.get("/v1/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    res.json(products)
  } catch (error) {
    console.error("Error al obtener los productos:", error)
    res.status(500).json({ error: "Error al obtener los productos" })
  }
})

app.post("/v1/products/add", async (req, res) => {
  console.log("Recibido en el backend:", req.body);
  try {
    const { title, price, description, images, categoryId } = req.body

    if (!title || !price || !description || !images || !categoryId) {
      if (!title) console.log("Falta title");
      if (!price) console.log("Falta price");
      if (!description) console.log("Falta description");
      if (!images) console.log("Falta images");
      if (!categoryId) console.log("Falta categoryId");
      return res.status(400).json({ error: "Faltan datos requeridos" })
    }
    const product = await prisma.product.create({
      data: {
        title,
        price: parseFloat(price),
        description,
        images,
        categoryId: parseInt(categoryId)
      },
    })
    res.json(product)
  } catch (error) {
    console.error("Error al crear el producto:", error)
    if (error.code === 'P2002') {
      res.status(400).json({ error: "Ya existe un producto con ese nombre" })
    } else {
      res.status(500).json({ error: "Error al crear el producto", details: error.message })
    }
  }
})

app.get("/v1/getStats", async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    const total = products.length
    res.json({ total })
  } catch (error) {
    console.error("Error al obtener el total de productos:", error)
    res.status(500).json({ error: "Error al obtener el total de productos" })
  }
})

app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`)
})
