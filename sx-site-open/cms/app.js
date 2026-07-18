const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
const config = require('./config');
const { runMigrations } = require('./config/migrations');
const { flashMessages } = require('./middleware/auth');

const webRoutes = require('./routes/web');
const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: config.session.secret,
  resave: config.session.resave,
  saveUninitialized: config.session.saveUninitialized,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(flash());
app.use(flashMessages);

app.use('/admin', adminRoutes);
app.use('/', webRoutes);

app.use((req, res) => {
  res.status(404).render('site/404', { title: 'Página não encontrada', menu: [] });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('site/500', { title: 'Erro interno', menu: [] });
});

async function start() {
  try {
    await runMigrations();
    const { seed } = require('./seed/seed');
    await seed();
    app.listen(config.port, () => {
      console.log(`\n  SxConnect CMS rodando em: http://localhost:${config.port}`);
      console.log(`  Admin: http://localhost:${config.port}/admin\n`);
    });
  } catch (err) {
    console.error('Erro ao iniciar:', err);
    app.listen(config.port, () => {
      console.log(`\n  SxConnect CMS rodando em: http://localhost:${config.port}`);
      console.log(`  Admin: http://localhost:${config.port}/admin\n`);
    });
  }
}

start();
