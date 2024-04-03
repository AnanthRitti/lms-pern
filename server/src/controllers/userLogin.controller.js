import db from "../db/db.js"
import jsonwebtoken from 'jsonwebtoken'


const userLogin = async (req,res) => {
    try {
    console.log(req.body)
    const {Username , Password} = req.body
    const login = await db.query(`SELECT * FROM users WHERE user_username=$1 AND user_password=$2`,[Username,Password])
    console.log(login.rows)
    console.log(Username)
    console.log(Password)
    if (!login.rows.length) return res.json({ detail: 'user does not exist' })
    else {
        const token = jsonwebtoken.sign({ Username }, 'secret', { expiresIn: '1hr' });
        res.json({ userId : login.rows[0].user_id , 'Type': login.rows[0].user_type, 'token': token });
    }
}
catch(err){
    console.log(err)
    res.status(401).json({ error: 'invalid username or password' })
}
}

export {
    userLogin
}