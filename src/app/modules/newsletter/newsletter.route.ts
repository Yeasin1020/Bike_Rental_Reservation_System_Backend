import express from 'express';
import { NewsletterController } from './newsletter.controller';

const router = express.Router();

router.post('/', NewsletterController.addNewsletter);
router.get('/', NewsletterController.listNewsletters);

export const NewsletterRoutes = router;
