const path = require('path');
const mongoose = require('mongoose');
const AlbumModel = require('../models/Album');
const ImageModel = require('../models/Image');

const getAlbums = (req, res, next) => {
    if(!req.session.userId){
        return res.redirect('/login');
    }
    AlbumModel.find({userId: req.session.userId}, (err, albums) => {
        if(err){
            res.render('400');
        }
        else {
            res.render('albums', {title: "Albums", albums});
        }
    });
};

const postAlbums = (req, res, next) => {
    let title = req.body.title;
    let userId = req.session.userId;
    if(!userId){
        res.status(401);
        return res.json({message: "Unauthorized"});
    }
    AlbumModel.create({title, userId}, (err, album) => {
        if(err){
            res.status(400);
            res.json({message: "Bad Request"});
        }
        else{
            res.status(201);
            res.json({
                title: album.title,
                _id: album._id,
                createdAt: album.createdAt,
                userId: album.userId
            });
        }
    });
};

const getAlbum = (req, res, next) => {
    let albumId = req.params.albumId;
    let userId = req.session.userId;
    if(!userId){
        return res.redirect("/login");
    }
    AlbumModel.findById(albumId, (err, album) => {
        if(err){
            res.render("404");
        }
        else{
            if(album.userId != userId){
                res.render("401");
            }
            else{
                ImageModel.find({albumId},(err, images) => {
                    if(err){
                        res.render("404");
                    }
                    else{
                        res.render("album", {title: album.title, album, images: images});
                    }
                });
            }
        }
    });

}

const deleteAlbum = (req, res, next) => {
    let albumId = req.params.albumId;
    let userId = req.session.userId;
    if(!userId){
        res.status(401);
        return res.json({message: "Unauthorized"});
    }
    AlbumModel.findByIdAndDelete(albumId, (err, album) => {
        if(err){
            res.status(400);
            res.send(null);
        }
        else {
            ImageModel.deleteMany({albumId: albumId}, () => {
                if(err){
                    res.status(400);
                    res.send(null);
                }
                else{
                    res.status(200);
                    res.send(null);
                }
            })
        }
    });
}

const postAlbum = (req, res, next) => {
    let userId = req.session.userId;
    if(!userId){
        res.status(401);
        return res.json({message: "Unauthorized"});
    }
    let albumId = req.params.albumId;
    let image = req.files.image;
    let title = image.name;
    image.name = userId + albumId + image.name;
    image.mv(path.resolve(__dirname, '../' ,'public/images', image.name), err => {
        if(err){
            res.status(500); 
            res.send();
        }
        else {
            ImageModel.create({
                title, 
                src: "/images/" + image.name,
                albumId: albumId
            }, 
                (err, o) => {
                    if(err){
                        res.status(500); // duplicate
                        res.send();
                    }
                    else{
                        res.status(201);
                        res.send(o);
                    }
            });
        }
    });
    
}

module.exports = {
    getAlbums,
    postAlbums,
    getAlbum,
    deleteAlbum,
    postAlbum
};
