import express from "express"
const app = express()

app.set("port", process.env.PORT || 3000)
app.set("json spaces", 2)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    Title: "Estamos operativos, por el momento",
  })
})

app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`)
})
