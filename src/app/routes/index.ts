import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BikeRoutes } from "../modules/bike/bike.route";
import { RentalRoutes } from "../modules/rental/rental.route";
import { AllUserRoutes } from "../modules/allUser/allUser.route";

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
  }


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;