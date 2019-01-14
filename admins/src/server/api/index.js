import {Router} from 'express'


const router = Router();

router.use(function (req, res, next) {
  next();
});

//获取验证码
router.get('/captcha', function (req, res) {
  res.send('123');
});


export default router
