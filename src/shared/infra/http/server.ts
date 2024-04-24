import "reflect-metadata"
import "dotenv/config"
import { app } from "./app"
import { dataSource } from "@shared/typeorm"

dataSource.initialize().then(() => {
  const server = app.listen(3333, () => {
    return console.log("Server started on port 3333!")
  })
})
