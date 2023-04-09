const jwtSecret = "MynameisHimanshuDaddy";
const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const classes = require("../Models/class");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUSER = require('../Middleware/FtechUsers');

// fetchUSER,


router.post("/createclass", fetchUSER,
    [
        body("email").isEmail(),
        body("title").isLength({ min: 5 }),
        body("ScheduledTime").isLength({ min: 1 })
    ],

    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const d = await classes.create({
                name: req.body.title,
                user: req.user.id,
                discription: req.body.discription,
                email: req.body.email,
                TeacherName: req.body.teacherName,
                ScheduledTime: req.body.ScheduledTime,
            });
            res.json({ success: true, classData: d });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
);

router.get('/fetchItems', fetchUSER, async (req, res) => {
    try {
        console.log(req.body)
        const notes = await classes.find({ user: req.user.id })
        res.send({ success: true, classData: notes });
    } catch (err) {
        res.status(404).json({ "err occouured": err })
    }
})

router.get('/fetchAllClasses', async (req, res) => {
    try {
        console.log(req.body)
        const notes = await classes.find()
        res.send({ success: true, classData: notes });
    } catch (err) {
        res.status(404).json({ "err occouured": err })
    }
})
router.put('/favclass/:id', fetchUSER,

    async (req, res) => {
        // try {

        const class_id = req.params.id

        let ClassData = await classes.findById(class_id)
        // console.log(user);
        // console.log(ClassData)

        console.log({ email: req.body.email })
        if (!ClassData) {
            return res.status(404).send("Notes not Found")
        }

        try {

            User.findOneAndUpdate(
                { 'email': req.body.email },
                {
                    $push: {
                        "favClass": class_id
                    }
                },
                { new: true }
            )
                .then(post => res.json({ likes: post.likes, unlikes: post.unlikes }))
                .catch(err => res.status(400).json(err));

        } catch (error) {
            console.log(error)
        }




        // } catch (err) {
        //     // console.log(err.message);
        //     res.status(404).json(
        //         { status: "failure", "Internal Error occouured !! ": err.message }
        //     );
        // }

    })

router.put('/UpdateItem/:id', fetchUSER,

    async (req, res) => {
        try {
            const { newCode } = req.body

            const UpdatedItem = {}
            if (newCode) { UpdatedItem.classCode = newCode };

            let ClassData = await classes.findById(req.params.id)
            if (!ClassData) {
                return res.status(404).send("Notes not Found")
            }


            if ((ClassData.id.toString()) !== (req.params.id)) {
                return res.status(401).send("NOT allowed")
            }

            await classes.findByIdAndUpdate(req.params.id, {
                $set: UpdatedItem
            }, { new: false })

            res.json({ status: "Success", updatedPart: [{ ClassData }, { UpdatedItem }] })


        } catch (err) {
            // console.log(err.message);
            res.status(404).json(
                { status: "failure", "Internal Error occouured !! ": err.message }
            );
        }

    })
// router.get('/getClasses',
//     async (req, res) => {

//         try {
//             const allData = await commentData.find()
//             res.send(allData)
//         } catch (err) {
//             // console.log(err.message);
//             res.status(404).json(
//                 {
//                     "Error occouured !! ": err
//                 }
//             );
//         }

//     }
// )

module.exports = router;
