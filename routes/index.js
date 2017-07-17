var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
// const xoauth2 = require('xoauth2');
//var mg = require('nodemailer-mailgun-transport');

var auth = {
  service: "Yandex",
	auth: {
		user: process.env.USER,
		pass: process.env.PASS
	}
}

let transporter = nodemailer.createTransport(auth);

const city = [
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
    ];
const prof = [
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
    ];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    city: city,
    prof: prof
  });
});

router.post('/', function(req, res){
  const n = city.indexOf(req.body.city);

  let mailOptions = {
    from: '"info.prombez" <info.prombez@yandex.ru>', // sender address
    to: n<10?process.env.em1:process.env.em2, // list of receivers
    subject: 'Заявка на обучение ✔', // Subject line
    text: '', // plain text body
    // html: '<b>Hello world ?</b>' // html body
  };

  mailOptions.text += req.body.name + ' ';
  mailOptions.text += 'отправил запрос на обучение по профессии' + req.body.prof + '. ';
  mailOptions.text += 'Город: '+ req.body.city+ '. ';
  mailOptions.text += 'Телефон: '+ req.body.phone;

  if (n) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          req.flash('error', 'Возникла ошибка, сообщение не отправлено! Повторите попытку позже.');
      } else {
        console.log('Message %s sent: %s', info.messageId, info.response);
        req.flash('success', 'Сообщение отправлено.');
      }
      
      return res.redirect('/');
    });
  } else {
    req.flash('error', 'Ошибка отправки. Повторите попытку позже.');
    return res.redirect('/');
  }

});

module.exports = router;