const Section = require('../models/Section');
const Post = require('../models/Post');
const Page = require('../models/Page');
const Solution = require('../models/Solution');
const MenuItem = require('../models/MenuItem');

async function getSiteData() {
  const [sections, posts, solutions, menu] = await Promise.all([
    Section.findAll({ visible: 1 }),
    Post.findAll({ published: 1, limit: 6 }),
    Solution.findAll({ published: 1 }),
    MenuItem.findTree()
  ]);
  return { sections, posts, solutions, menu };
}

exports.home = async (req, res, next) => {
  try {
    const data = await getSiteData();
    const heroSection = data.sections.find(s => s.type === 'hero');
    const newsSection = data.sections.find(s => s.type === 'news');
    const featuredPost = data.posts.find(p => p.featured);
    const sidePosts = data.posts.filter(p => !p.featured || p.id !== (featuredPost && featuredPost.id));

    res.render('site/home', {
      title: 'SxConnect | Atendimento Inteligente com IA',
      ...data,
      heroSection,
      newsSection,
      featuredPost,
      sidePosts
    });
  } catch (err) { next(err); }
};

exports.page = async (req, res, next) => {
  try {
    const page = await Page.findBySlug(req.params.slug);
    if (!page) return res.status(404).render('site/404', { title: 'P\u00e1gina n\u00e3o encontrada', menu: [] });
    const menu = await MenuItem.findTree();
    res.render('site/page', { title: page.title, page, menu });
  } catch (err) { next(err); }
};

exports.blog = async (req, res, next) => {
  try {
    const posts = await Post.findAll({ published: 1 });
    const menu = await MenuItem.findTree();
    res.render('site/blog', { title: 'Blog - SxConnect', posts, menu });
  } catch (err) { next(err); }
};

exports.post = async (req, res, next) => {
  try {
    const post = await Post.findBySlug(req.params.slug);
    if (!post) return res.status(404).render('site/404', { title: 'Post n\u00e3o encontrado', menu: [] });
    const recentPosts = await Post.findAll({ published: 1, limit: 4 });
    const menu = await MenuItem.findTree();
    res.render('site/post', { title: post.title, post, recentPosts, menu });
  } catch (err) { next(err); }
};

exports.solution = async (req, res, next) => {
  try {
    const solution = await Solution.findBySlug(req.params.slug);
    if (!solution) return res.status(404).render('site/404', { title: 'Solu\u00e7\u00e3o n\u00e3o encontrada', menu: [] });
    const menu = await MenuItem.findTree();
    res.render('site/solution', { title: solution.title, solution, menu });
  } catch (err) { next(err); }
};

exports.contact = async (req, res, next) => {
  try {
    const menu = await MenuItem.findTree();
    res.render('site/contact', { title: 'Contato - SxConnect', menu });
  } catch (err) { next(err); }
};
