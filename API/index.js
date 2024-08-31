import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const app = express()

app.set("port", process.env.PORT || 3000)
app.set("json spaces", 2)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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

app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`)
})
