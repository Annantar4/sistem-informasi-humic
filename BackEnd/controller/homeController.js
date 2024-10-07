import Home from "../model/homeModel.js";


export const getHome = async(req, res)=>{
    try {
        const slider = await Home.findAll({
            where: {
                type: 'slider'
            },
            attributes: ['id', 'type', 'title', 'content', 'imagePath']
        });
        const latestNew = await Home.findAll({
            where: {
                type: 'latest_new'
            },
            attributes: ['id', 'type', 'title', 'content', 'imagePath']
        });
        const event = await Home.findAll({
            where: {
                type: 'event'
            },
            attributes: ['id', 'type', 'title', 'content',  'imagePath']
        });
        res.status(200).json({
            msg: "Success",
            slider,
            latestNew,
            event
        })
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

export const createHomeContent = async(req, res)=>{
    const {type, title, content} = req.body;
    try {
        if(type === 'slider'){
            const imagePath = req.file ? req.file.filename : null;
            if(imagePath){
                await Home.create({
                    type,
                    title,
                    content,
                    imagePath
                });
                res.status(201).json({msg : "Success"});
            }
        }
        if(type === 'latest_new'){
            const imagePath = req.file ? req.file.filename : null;
            await Home.create({
                type,
                title,
                content,
                imagePath
            });
            res.status(201).json({msg : "Success"});

        }
        if(type === 'event'){
            const imagePath = req.file ? req.file.filename : null;
            await Home.create({
                type,
                title,
                content,
                imagePath
            });
            res.status(201).json({msg : "Success"});
        }
        
    } catch (error) {
        res.status(404).json({msg : error})
    }
}

export const getContentById = async(req, res)=>{
    try {
        const content = await Home.findOne({
            where:{
                id: req.params.id,
            },
            attributes:['id', 'type', 'title', 'content', 'imagePath']
        })
        if(!content) return res.status(404).json({msg: "Not Found"});
        res.status(200).json({
            msg: "Success",
            data: content
        })
    } catch (error) {
        res.status(404).json({msg : error})
    }
}