const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Explore the World of DAILY JOURNAL: Discover Insights, Inspiration, and Expertise Welcome to DAILY JOURNAL, a vibrant online destination dedicated to sharing knowledge, ideas, and inspiration. Our mission is to provide you with a gateway to explore a diverse range of topics, from lifestyle and travel to technology and wellness. Immerse yourself in captivating articles, thought-provoking discussions, and expert advice that will empower and enrich your everyday life. Step into a world of endless possibilities as we delve into the latest trends, uncover hidden gems, and offer valuable insights to help you navigate the complexities of modern living. Our team of passionate writers and contributors are committed to delivering engaging and well-researched content that sparks your curiosity and fuels your desire for knowledge.";
const aboutContent = "About DAILY JOURNAL: Empowering and Inspiring Through Knowledge at DAILY JOURNAL, we believe that knowledge is a powerful tool that can transform lives and inspire positive change. Our platform is a culmination of passion, expertise, and a shared vision to create a community that embraces the pursuit of knowledge, personal growth, and exploration. We are a team of dedicated writers, thinkers, and explorers who are committed to curating content that educates, entertains, and empowers our readers. Our mission is to provide a platform where ideas can flourish, where curiosity is celebrated, and where individuals can find inspiration to embark on their own personal journeys. Through our carefully crafted articles, we strive to bring you insightful perspectives, practical advice, and thought-provoking discussions on a wide array of topics. Whether it's travel, wellness, technology, or lifestyle, we aim to provide a diverse range of content that resonates with our readers' interests and aspirations.";
const contactContent = "Get in Touch with DAILY JOURNAL: Reach Out and Connect.Thank you for your interest in contacting us at DAILY JOURNAL. We value your input, questions, and feedback, and we're excited to hear from you. There are several ways you can get in touch with us:";
const contactSocials = "Connect with us on our social media platforms to stay updated on the latest blog posts, news, and announcements. You can send us a direct message or leave a comment with your questions or feedback, and we'll get back to you promptly.";

const app = express();

let posts = [];



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


app.get("/", function(req, res){
  res.render("home",{homeStartingContent: homeStartingContent, posts: posts});
})

app.get("/about", function(req,res){
  res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function(req,res){
  res.render("contact", {contactContent: contactContent});
})

app.get("/compose", function(req,res){
  res.render("compose");
})

app.post("/compose", function(req,res) {
  let post = {
    title: req.body.blogTitle,
    body: req.body.blogBody
  }
 posts.push(post);
 res.redirect("/");
})

app.get("/posts/:userId", function(req,res){
  const para = _.lowerCase(req.params.userId);
 posts.forEach (function(element) {
  const tits = _.lowerCase(element.title);
  if (para === tits) {
    res.render("post", {
      title: element.title,
      content: element.body
    });
  }
 }) 
})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
