const path = require('path');
const express = require('express');
const views = require('./views');
const controllers = require('./controllers')
const dayjs = require('dayjs');
const engine = require('express-handlebars');
const sequelize = require('./config/connection');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const Filter = require('bad-words')
const Handlebars = require('handlebars/runtime')
const filter = new Filter({ placeHolder: '&#9619;'})


var hbs = engine.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: `${__dirname}/views/layouts`,
  partialsDir: `${__dirname}/views/partials`,
  helpers: {
    formatTime: function (date, format) {
      return dayjs(date).format(format);
    },
    compare: function (val1, val2, options) {
      return val1 == val2 ? options.fn(this) : options.inverse(this)
    },
    contains: function (val1, val2, options) {
      if (val1 && val2 && val1.includes(val2)) {
        return options.fn(this) 
      } else {
        return options.inverse(this)
      }
    },
    censor: function (string) {
      return new Handlebars.SafeString(filter.clean(string))
    },
    maximum: function (val1, val2, options) {
      return val1.length < val2 ? options.fn(this) : options.inverse(this)
    },
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  },
});

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  store: new SequelizeStore({
    db: sequelize
  }),
  secret: process.env.SOME_OTHER_PLAINTEXT_PASSWORD,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
}));


//username and password




app.engine('hbs',  hbs.engine);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(controllers)
app.use(views);


// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false })
.then(() => 
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
}));
