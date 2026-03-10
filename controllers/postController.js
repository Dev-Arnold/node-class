import Post from "../models/post.js";
import User from "../models/user.js"

const createPost = async (req,res)=>{
    try {
        let {title, snippet, content,} = req.body;
        let author = req.user.id;

        let existingUser = await User.findById(author)
        
        if (!title || !snippet || !content) {
            return res.status(400).json({message:"All fields are required."})
        }

        let post = await Post.create({
            title,
            snippet,
            content,
            author
        })

        existingUser.posts.push(post._id);
        await existingUser.save()

        res.status(201).json({message:"post created successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }

}

const getAllPosts = async(req,res)=>{
    try {
        let posts = await Post.find({author: req.user.id})

        if(!posts) return res.status(404).json({message:"no posts found"});

        res.status(200).json({posts})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export {
    createPost,
    getAllPosts
}