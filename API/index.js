import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"

const prisma = new PrismaClient()
const app = express()

app.set("port", process.env.PORT || 4000)
app.set("json spaces", 2)

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

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
