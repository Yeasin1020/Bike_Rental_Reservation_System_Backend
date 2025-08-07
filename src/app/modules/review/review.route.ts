import express from 'express';
import authenticate from '../../middlewares/authenticate';
import { addComment, addReply, createReview, getMyReviews, likeReview } from './review.controller';


const router = express.Router();

router.post('/:bikeId/:bookingId', authenticate, createReview);
router.patch('/:reviewId/like', authenticate, likeReview);
router.put('/:reviewId/comment', authenticate, addComment);

router.post('/:reviewId/comment/:commentId/reply', authenticate, addReply);
router.get('/my-reviews', authenticate, getMyReviews);

export const ReviewRoutes = router;