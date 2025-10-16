import { Router } from 'express'
import { createPost, getAndposts, getPostById } from './post.controller.js'
import { createpostValidator } from '../../middlewares/post-validator.js'

const router = Router()

router.post('/', createpostValidator, createPost)

router.get('/', getAndposts)

router.get('/:id', getPostById)

export default router