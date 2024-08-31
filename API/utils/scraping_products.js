import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const api_url = "https://api.escuelajs.co/api/v1/products"

// https://www.prisma.io/docs/orm/prisma-client/queries/crud#create

async function datosToPrisma() {
  try {
    const respuesta = await fetch(api_url)
    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.statusText}`)
    }
    const datos = await respuesta.json()

    for (const producto of datos) {
      let categoria = await prisma.category.findUnique({
        where: { name: producto.category.name },
      })

      if (!categoria) {
        categoria = await prisma.category.create({
          data: {
            name: producto.category.name,
            image: producto.category.image,
          },
        })
      }

      await prisma.product.create({
        data: {
          title: producto.title,
          price: producto.price,
          description: producto.description,
          images: producto.images.join(","),
          categoryId: categoria.id,
        },
      })
    }
    console.log("Datos insertados en la base de datos con éxito.")
  } catch (error) {
    console.error("Hubo un problema con la solicitud fetch:", error)
  } finally {
    await prisma.$disconnect()
  }
}

datosToPrisma()
