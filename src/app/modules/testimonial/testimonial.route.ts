import express from 'express';
import { TestimonialController } from './testimonial.controller';

const router = express.Router();

router.post('/', TestimonialController.addTestimonial);
router.get('/', TestimonialController.listTestimonials);

export const TestimonialRoutes = router;
