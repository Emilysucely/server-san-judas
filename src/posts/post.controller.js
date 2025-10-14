import Post from './post.model.js'
import User from '../users/user.model.js'
import Comment from '../comments/comment.model.js'

export const createPost = async (req, res) => {
    try{
        const { title, content } = req.bpdy
        const authorId = req.uid

        const post = new Post.create({
            title,
            content,
            author: authorId
        })

        await User.findByIdAndUpdate(authorId, {
            $push: { posts: post._id }
        })

        const populatadePost = await Post.findById(post._id)
            .populate('author', 'name surname profilePicture')
            .populate('comments')

        return res.status(201).json({
            message: 'Publicación exitosa',
            post: populatadePost
        })
    }catch (error){
        return res.status(500).json({
            message: 'Error al guardar la publicación',
            error: error.message
        })
    }
}

export const getAndposts = async (req, res) => {
    try{
        const { page = 1, limit = 8 } = req.query
        const skip = (page - 1) * limit

        const posts = await Post.find()
            .populate('author', 'name surname username profilePicture' )
            .populate({
                path: 'comments',
                populate:{
                    path: 'author',
                    select: 'name surname username profilePicture' 
                }
            })
        .sort({ createAt: -1 })
        .skip(skip)
        .limit(pearseInt(limit))

    const totalPosts = await Post.countDocuments()

    return res.status(200).json({
        message: 'Publicaciones obtenidas exitosamente',
        posts,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            totalPosts,
            page: Math.ceil(totalPosts / limit)
        }
    })
    }catch (error){
        return res.status(500).json({
            message: 'Error al obtener la publicaciones',
            error: error.message
        })
    }
}

export const getPostById = async (req, res) => {
    try{
        const { id } = req.params

        const post = await Post.findById(id)
        .populate('author', 'name surname username profilePicture')
        .populate({
            path: 'comments',
            populate:{
                path: 'author',
                select: 'name surname username profilePicture'

            }
        })

        return res.status(200).json({
            message: 'publicación obtenida exitosamente',
            post
        })
    }catch(error){
        return res.status(500).json({
            message: 'Error al obtener la publicación',
            error: error.messsage
        })
    }
}