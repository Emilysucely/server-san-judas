import { Router } from 'express'
import { createPost, getAndposts, getPostById } from './post.controller.js'

const router = Router()

router.post('/', createPost)

router.get('/', getAndposts)

router.get('/:id', getPostById)

export default router