const { ObjectId } = require("mongodb");
const db = require("../data/database");

exports.getPosts = async (req, res, next) => {
  const posts = await db.getDb().collection("posts").find().toArray();
  res.render("posts-list", { posts });
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.id;
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) });
  res.render("post-detail", { post });
};

exports.getCreatePost = async (req, res, next) => {
  const authors = await db.getDb().collection("authors").find().toArray();
  // console.log(authors);
  res.render("create-post", { authors });
};

exports.postCreatePost = async (req, res, next) => {
  const title = req.body.title;
  const summary = req.body.summary;
  const authorId = req.body.authorId;
  const description = req.body.description;
  const date = new Date();

  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: new ObjectId(authorId) });
  await db.getDb().collection("posts").insertOne({
    title: title,
    summary: summary,
    description: description,
    author: author,
    date: date,
  });
  res.redirect("/");
};

exports.getUpdatePost = async (req, res, next) => {
  const postId = req.params.id;
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) });
  res.render("update-post", { post });
};

exports.postUpdatePost = async (req, res, next) => {
  const postId = req.body.postId;
  const updatedTitle = req.body.title;
  const updatedSummary = req.body.summary;
  const updatedDesc = req.body.description;

  await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          title: updatedTitle,
          summary: updatedSummary,
          description: updatedDesc,
        },
      }
    );
  res.redirect("/")
};

exports.postDeletePost = async (req, res, next) => {
  const postId = req.body.postId

  await db.getDb().collection("posts").deleteOne({ _id: new ObjectId(postId) })
  res.redirect("/")
}