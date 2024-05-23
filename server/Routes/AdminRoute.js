import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer';
import path from 'path';

const router = express.Router()

// now use this router to create API
router.post('/adminlogin', (req, res)=> {
    const sql =  'select * from admin Where email = ? and password = ?'                        // to check the recieved credentials
    con.query(sql,[req.body.email, req.body.password], (err,result) => {
        if(err) return res.json({loginStatus: false, Error: "Query error"})
        if(result.length>0){
            const email = result[0].email;
            const token = jwt.sign({role: "admin", emai: email}, "jwt_secret_key", {expiresIn: '1d'})
            res.cookie('token',token)
            return res.json({ loginStatus: true});
        }else{
            return res.json({loginStatus: false, Error: "wrong email or passwords"});
        }
    })
})

router.get('/course', (req, res) => {
    const sql = "SELECT * FROM course"
    con.query(sql, (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_course', (req,res) => {
    const sql = 'INSERT INTO course (`name`) VALUES (?)'
    con.query(sql, [req.body.course], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// Results

router.get('/results', (req, res) => {
    const sql = "SELECT * FROM results"
    con.query(sql, (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_results', (req, res) => {
    const sql = `INSERT INTO results 
    (name, id, earn_credit, marks, grade) 
    VALUES (?)`;

        const values = [
            req.body.name,
            req.body.id,
            req.body.earn_credit,
            req.body.marks, // Assuming this is the correct field for fees
            req.body.grade
        ];
 
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err });
            return res.json({ Status: true });
        });
    });

    router.get('/results/:id', (req, res) => {
        const id = req.params.id;
        const sql = "SELECT * FROM results WHERE id = ?";  // Use LIMIT 1 to get only one row
        
        con.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Query Error:", err);
                return res.json({ Status: false, Error: "Query Error" });
            }
    
            if (result.length === 0) {
                return res.json({ Status: false, Error: "No results found" });
            }
    
            return res.json({ Status: true, Result: result[0]});  // Send the first (and only) result
        });
    });
    
    

    router.put('/edit_result/:id', (req, res) => {
        const id = req.params.id;
        const sql = `UPDATE results SET name=?, earn_credit=?, marks=?, grade=? WHERE id=?`;
        // console.log(id)
        const values = [
            req.body.name,
            // req.body.id,
            req.body.earn_credit,
            req.body.marks, // Assuming this is the correct field for marks
            req.body.grade
        ];
        con.query(sql,[...values, id], (err,result) =>{
            if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
        })
    });

    
    router.delete('/delete_results/:id', (req,res) => {
        const id = req.params.id;
        const sql = "delete from results where id = ?"
        con.query(sql,[id], (err,result) =>{
            if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
        })
    })
    

// image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'Public/images')
    }, filename: (req, file, cb) => {
        cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/add_student', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO student 
    (name, email, password, address, fees, result, image, course_id) 
    VALUES (?)`;

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Hashing Error" });

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.fees,
            req.body.result, // Assuming this is the correct field for fees
            req.file.filename,
            req.body.course_id
        ];

        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err });
            return res.json({ Status: true });
        });
    });
});


router.get('/student', (req, res) => {
    const sql = "SELECT * FROM student"
    con.query(sql, (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/student/:id', (req,res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?";
    con.query(sql,[id], (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_student/:id', (req,res) => {
    const id = req.params.id;
    const sql = `UPDATE student set name= ?, email= ?, fees= ?, address= ?, course_id= ? where id =?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.fees,
        req.body.address, 
        req.body.course_id
    ];
    con.query(sql,[...values, id], (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

// router.delete('/delete_student/:id', (req,res) => {
//     const id = req.params.id;
//     const sql = "delete from student where id = ?"
//     con.query(sql,[id], (err,result) =>{
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

router.get('/admin_count', (req,res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/student_count', (req,res) => {
    const sql = "select count(id) as student from student";
    con.query(sql, (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/course_count', (req,res) => {
    const sql = "select count(id) as course from course";
    con.query(sql, (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req,res) => {
    const sql = "select * from admin"
    con.query(sql, (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/fees', (req, res) => {
    const sql = "SELECT * FROM fees"
    con.query(sql, (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export {router as adminRouter}