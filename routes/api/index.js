const express = require('express')
const router = express.Router()

const MemberModel = require('../../models/member');

router.get('/aye', (req, res) => {
    res.send('aye aye');
});

router.get('/list-members', (req, res) => {
    var search = req.query.search;

    var filterString = { $regex: new RegExp(search, "i") };
    var filterNumber = { $eq: parseInt(search) || 0 };
    
    MemberModel
        .find({
            $or: [
                { first_name: filterString },
                { last_name: filterString },
                { number: filterNumber },
            ]
        })
        .sort({number: 1})
        .then(members => {
            const mappedMembers = members.map(member => {
                return {
                    id: member._id,
                    first_name: member.first_name,
                    last_name: member.last_name,
                    photo: member.photo,
                    address: member.address,
                    phone: member.phone,
                    email: member.email,
                    number: member.number
                };
            });
            res.json(mappedMembers);
        })
        .catch(err => {
            res.status(400).send('Error');
        })

});

module.exports = router;
