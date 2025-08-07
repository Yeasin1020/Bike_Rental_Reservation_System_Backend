import express from 'express';
import authenticate from '../../middlewares/authenticate';
import { addComment, addReply, createReview, deleteReview, getAllReviews, getMyReviews, getPublicReviews, likeReview } from './review.controller';


const router = express.Router();
router.get('/', getAllReviews);
router.post('/:bikeId/:bookingId', authenticate, createReview);
router.patch('/:reviewId/like', authenticate, likeReview);
router.put('/:reviewId/comment', authenticate, addComment);

router.post('/:reviewId/comment/:commentId/reply', authenticate, addReply);
router.get('/my-reviews', authenticate, getMyReviews);
router.get('/public', getPublicReviews);
router.delete('/:reviewId', authenticate, deleteReview);
export const ReviewRoutes = router;