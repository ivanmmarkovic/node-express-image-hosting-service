const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/AlbumsController');

router.get('/albums', albumsController.getAlbums);
router.post('/albums', albumsController.postAlbums);
router.get('/albums/:albumId', albumsController.getAlbum);
router.delete('/albums/:albumId', albumsController.deleteAlbum);
router.post('/albums/:albumId', albumsController.postAlbum);

module.exports = router;