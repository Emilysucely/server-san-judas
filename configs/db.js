'use strict'

import mongoose from "mongoose"

export const dbConnection = async ()=> {
    try{
        mongoose.connection.on('error', () => {
            console.log('MongoDB | intentando conetar a mongoDB')
            mongodb.disconnect()
        })
          mongoose.connection.on('connecting', () => {
            console.log('MongoDB | intentando conetar a mongoDB')
        })
        
          mongoose.connection.on('connected', () => {
            console.log('MongoDB | conectando a mongoDB')
        })
         mongoose.connection.on('open', () => {
            console.log('MongoDB | conectando a la base de datos')
        })
         mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconectando a mongoDB')
        })
         mongoose.connection.on('disconnected', () => { 
            console.log('MongoDB | desconectando de mongoDB')
        })
        await mongoose.connect(process.env.URI_MONGODB, {
            serverSelectionTimeoutMS: 5000,
            maxpooLSize: 10
        })
    }catch(error){
        console.log(`Error al controlar la db: ${error}`)
    }
}