const Post = require('../models/Post');
const Page = require('../models/Page');
const Section = require('../models/Section');
const Solution = require('../models/Solution');

exports.index = async (req, res, next) => {
  try {
    const [posts, pages, sections, solutions] = await Promise.all([
      Post.findAll({ limit: 5 }),
      Page.findAll({ published: 1 }),
      Section.findAll({ visible: 1 }),
      Solution.findAll({ published: 1 })
    ]);
    res.render('admin/index', {
      title: 'Dashboard',
      postCount: posts.length,
      pageCount: pages.length,
      sectionCount: sections.length,
      solutionCount: solutions.length,
      recentPosts: posts
    });
  } catch (err) { next(err); }
};
