import { Router, type IRouter } from "express";
import healthRouter from "./health";
import qualityAreasRouter from "./qualityAreas";
import standardsRouter from "./standards";
import strategiesRouter from "./strategies";
import progressRouter from "./progress";
import notesRouter from "./notes";
import favoritesRouter from "./favorites";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(qualityAreasRouter);
router.use(standardsRouter);
router.use(strategiesRouter);
router.use(progressRouter);
router.use(notesRouter);
router.use(favoritesRouter);
router.use(dashboardRouter);

export default router;
