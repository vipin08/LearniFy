import express from "express"
import fs from "fs"
import path from "path"

const router = express.Router()

const dataFolder = path.join(process.cwd(), "data")
const filePath = path.join(dataFolder, "users.json")

router.post('/', (req, res) => {
    const {username, password} = req.body

    // data folder nhi hai toh bnao
    if(!fs.existsSync(dataFolder)){
        fs.mkdirSync(dataFolder)
    }

    // users.json file nhi hai toh bnao
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath, JSON.stringify([], null, 2))
    }

    // users.json read karo
    let users = []
    const fileData = fs.readFileSync(filePath, "utf-8")
    if(fileData.trim() !== ""){
        users = JSON.parse(fileData)
    }

    // username agar already exist karta hai... uska logic
    const userExist = users.find(e => e.username === username)

    if(userExist){
        return res.status(400).json({
            success: false,
            message: "Username already exist"
        })
    }

    // naya user add karne ke liye
    users.push({
        username,
        password
    })

    // file me save karne ke liye
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))

    res.status(201).json({
        success: true,
        message: "Signup Successful"
    })

})

export default router

