var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'pride.ots@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.msg = {
    display: false,
    msg: '',
    class: ''
  };
  res.render('index', {
    title: 'Express',
    city: [
      'Соликамск',
      'Березники',
      'Александровск',
      'Яйва',
      'Кизел',
      'Губаха',
      'Усолье',
      'Красновишерск',
      'Чердынь',
      'Ныроб',
      'Пермь',
      'Добрянка',
      'Краснокамск',
      'Чусовой',
      'Лысьва',
      'Горнозаводск',
      'Кунгур',
      'Оса',
      'Чернушка',
      'Кудымкар',
      'Нытва',
      'Чайковский',
      '*другой'
    ],
    prof: [
      'Машинист подъемных машин',
      'Аппаратчик сосудов, работающих под давлением',
      'Крановщики мостовых, козловых, башенных, стреловых самоходных, кранов-манипуляторов, автомобильных, плав. кранов',
      'Пескоструйщик',
      'Маляр',
      'Стволовой',
      'Лаборант химического анализа',
      'Лифтёр',
      'Машинист лебёдок',
      'Машинист компрессорных установок',
      'Оператор котельной, ТМУ',
      'Персонал, обслуживающий сосуды, работающие под давлением',
      'Персонал, обслуживающий газопотребляющее и газораспределяющее оборудование',
      'Персонал по обслуживанию, ремонту и эксплуатации ТЭУ',
      'Рабочий люлек подъёмников (вышек)/фасадных подъёмников',
      'Резчик на сжиженном газе пропан-бутане',
      'Стропальщик ПС',
      'Стропальщик с правом работы с ПС, управляемых с пола',
      'Слесарь-ремонтник по ремонту и обслуживанию ПС',
      'Слесарь по ремонту оборудования топливоподачи',
      'Слесарь по эксплуатации и ремонту газового оборудования',
      'Сливщик-заливщик ГСМ (горючесмазочных материалов)',
      'Электромонтёр по ремонту и обслуживанию ПС'
    ]
  });
});

router.post('/', function(req, res){
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        req.flash('error', 'Возникла ошибка, сообщение не отправлено! Повторите попытку позже.');
        return res.redirect('/');
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    req.flash('success', 'Сообщение отправлено.');
    res.redirect('/');
  });
});

module.exports = router;