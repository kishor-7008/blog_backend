import Post from "../model/blog.js";

export const post = async (req, res) => {
  console.log(req.body)
  try {
    const { title, summary, content } = req.body;
    const postSave = await Post.create({
      title,
      summary,
      content,
      file: req.file.filename,
    });
    console.log("postSave", postSave);

    return res.status(201).json(postSave);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// export const blogList = async(req,res)=>{
//     try{
//         const posts = await Post.find().populate("file",['filename']);
//         const data = posts.map(post => {
//             return {
//                 _id: post._id,
//                 title: post.title,
//                 summary: post.summary,
//                 content: post.content,
//                 fileUrl: `http://localhost:8000/api/v1/blog/${filename}`,
//                 createdAt: post.createdAt,
//                 updatedAt: post.updatedAt,
//                 __v: post.__v
//             }
//         });
//         res.status(200).json(data)
//     }catch(err){
//         res.status(404).json({ message: err.message });
//     }
// }

// export const blogList = async(req,res)=>{
//     try{
//         const posts = await Post.find()
//         const postsWithFileUrl = posts.map(post => {
//             const file = post.file[0];
//             if (file) {
//                 const fileUrl = `http://localhost:8000/api/v1/blog/${filename}`;
//                 return {
//                     ...post._doc,
//                     fileUrl
//                 };
//             }
//             return post;
//         });
//         res.status(200).json(postsWithFileUrl);
//     }catch(err){
//         res.status(404).json({ message: err.message });
//     }
// }

export const blogList = async (req, res) => {
  console.log("bloglist")
  try {
    // let page = Number(req.query.page) || 1

    // let limit = Number(req.query.limit) || 1

    // let skip = (page-1) * limit
    const posts = await Post.find().sort({ createdAt: -1 });
    console.log("post ", post);
    const data = posts.map((post) => {
      console.log("post inside data" , post.file)
      return {
        _id: post._id,
        title: post.title,
        summary: post.summary,
        content: post.content,
        fileUrl: `http://localhost:8000/api/v1/blog/${post.file}`,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        __v: post.__v,
      };
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const blog = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBlog = await Post.find({ _id: id }).populate("file", [
      "filename",
    ]);
    return res.status(200).json(singleBlog);
  } catch {
    return res.status(404).json({ message: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.findByIdAndDelete({ _id: id });
    //   if (!post) {
    //     return res.status(404).json({ error: 'Post not found' });
    //   }
    //   await post.delete();
    return res.status(200).json({ message: "Post has been deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
