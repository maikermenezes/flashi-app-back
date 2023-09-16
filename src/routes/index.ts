import { Router } from 'express';
import routes from './MailRoutes';
import UserRouter from './UserRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/email', routes);
router.route('/').get((req, res) => {
  res.send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;
