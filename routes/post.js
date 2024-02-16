const express = require("express");

const postController = require("../controllers/post")

const router = express.Router();

router.get("/", postController.getPosts);

router.get("/create-post", postController.getCreatePost);

router.post("/create-post", postController.postCreatePost)

router.get("/post-detail/:id", postController.getPost);

router.get("/post-update/:id", postController.getUpdatePost);

router.post("/post-update", postController.postUpdatePost)

router.post("/post-delete", postController.postDeletePost)

module.exports = router;
