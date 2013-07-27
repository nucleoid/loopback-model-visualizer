var index = require('../lib/index');
var viz = index.VizVisualizer;

var loopbackData = require('loopback-data');
var DataSource = loopbackData.DataSource;
var ds = new DataSource('memory');

// define models
var Post = ds.define('Post', {
    title: { type: String, length: 255 },
    content: { type: DataSource.Text },
    date: { type: Date, default: function () {
        return new Date;
    } },
    timestamp: { type: Number, default: Date.now },
    published: { type: Boolean, default: false, index: true }
});

// simplier way to describe model
var User = ds.define('User', {
    name: String,
    bio: DataSource.Text,
    approved: Boolean,
    joinedAt: Date,
    age: Number
});

// setup relationships
User.hasMany(Post, {as: 'posts', foreignKey: 'userId'});

var user = new User({name: 'Joe', age: 30, joinedAt: new Date()});

// console.log(ds.models);
// console.log(ds.definitions);

var options = {
    builtins: false,
    allFunctions: false
};

var clsSvg = viz.render('User', User, options);

console.log('\n', clsSvg);

var objSvg = viz.render('User', user, options);
console.log('\n', objSvg);
