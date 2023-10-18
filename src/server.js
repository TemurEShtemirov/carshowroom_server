import express from 'express'

async function bootstrap(){
    const app = express()
const port = 8585;

    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

app.listen(port,()=>{
    try {
        console.log(`Server is running on port :${port}`);
    } catch (error) {
        
    }
})

}