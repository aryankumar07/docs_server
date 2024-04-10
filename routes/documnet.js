const express = require('express');
const Document = require('../models/documnet');
const router = express.Router();
const auth = require('../midleware/auth');

router.post('/doc/create',auth, async (req,res,next)=>{
    try{
        const { createdAt } = req.body;
        const document = Document({
            uid : req.user,
            createdAt : createdAt,
            title : 'documet created',
        })

        newdocument = await document.save();
        res.status(200).json({ document : newdocument });

    }catch(e){
        res.status(500).json({msg:e.message});
    }
});

router.get('/docs/me',auth, async (req,res,next)=>{
    try{
        let docs = await Document.find({uid : req.user});
        res.status(200).json({docs : docs});
    }catch(e){
        res.status(500).json({msg:e.message});
    }
});

router.post('/docs/title',auth, async (req,res,next)=>{
    try{
        const { id,title } = req.body;
        const document = await Document.findByIdAndUpdate(id, { title });
        res.status(200).json({ document : document });
    }catch(e){
        res.status(500).json({msg : e.message })
    }
});

router.get('/docs/:id',auth,async (req,res,next)=>{
    try{
        let doc = await Document.findById(req.params.id);
        res.status(200).json({doc : doc});
    }catch(e){
        res.status(500).json({msg:'failed to get the document data'});
    }
});





module.exports = router;