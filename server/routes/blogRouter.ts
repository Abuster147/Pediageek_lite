import express from "express";
import blogCtrl from "../controllers/blogCtrl";
import blogCtr2 from "../controllers/blogCtrl2";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/blog", auth, blogCtrl.createBlog);

router.get("/home/blogs", blogCtrl.getHomeBlogs);
router.get("/home/signedblogsbysearch", auth, blogCtrl.getHomeBlogsBySearch);
router.get(
  "/home/signedblogsbycategory",
  auth,
  blogCtrl.getHomeBlogsByCategory
);
router.get("/home/signedblogsbyfollow", auth, blogCtrl.getHomeBlogsByFollow);
router.get("/blogs/category/:id", blogCtrl.getBlogsByCategory);
router.get("/blogs/user/:id", blogCtrl.getBlogsByUser);

router.get("/blogs/categorybysearch", blogCtrl.getHomeBlogsByCategorySearch);

router
  .route("/blog/:id")
  .get(blogCtrl.getBlog)
  .put(auth, blogCtrl.updateBlog)
  .delete(auth, blogCtrl.deleteBlog);

router
  .route("/like")
  .put(auth, blogCtr2.likeBlog)
  .patch(auth, blogCtr2.unlikeBlog);

router.route("/share/:id").put(auth, blogCtr2.shareBlog);
router.route("/simmilarblogs").get(blogCtr2.simillarBlog);
router.route("/suggestedit/:id").put(auth, blogCtr2.shareBlog);
router.route("/report/:id").put(auth, blogCtr2.shareBlog);
router.get("/search/blogs", blogCtrl.searchBlogs);

export default router;
