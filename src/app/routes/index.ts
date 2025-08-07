import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BikeRoutes } from "../modules/bike/bike.route";
import { RentalRoutes } from "../modules/rental/rental.route";
import { AllUserRoutes } from "../modules/allUser/allUser.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { NewsletterRoutes } from "../modules/newsletter/newsletter.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: "/bikes",
    route: BikeRoutes
  },
  {
    path: "/rentals",
    route: RentalRoutes
  },
  {
    path: "/allUser",
    route: AllUserRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/newsletter",
    route: NewsletterRoutes
  }


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;