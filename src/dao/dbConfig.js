import mongoose from "mongoose";

mongoose.connect("mongodb+srv://desafioCoder:1234@cluster0.cjinh2b.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})