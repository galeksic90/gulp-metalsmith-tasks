

var metalsmith = require('metalsmith'),
    ignore = require('metalsmith-ignore'),
    prismic = require('metalsmith-prismic'),
    redirect = require('metalsmith-redirect'),
    metadata = require('metalsmith-metadata'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    permalinks = require('metalsmith-permalinks'),
    collections = require('metalsmith-collections'),
    htmlminifier = require('metalsmith-html-minifier'),
    writemetadata = require('metalsmith-writemetadata'),
    htmlbeautifier = require('metalsmith-beautify');

var isEmpty = require('lodash').isEmpty;

function enabled(obj) {
    if (obj && !isEmpty(obj))
        return true;
}

module.exports = {
    build: function (baseDir, config, callback) {

        var ms = metalsmith(baseDir).metadata(config.metadata).source(config.source).destination(config.dest).clean(false);

        if (enabled(config.loadmetadata))
            ms.use(metadata(config.loadmetadata));

        if (enabled(config.redirect))
            ms.use(redirect(config.redirect));

        if (config.ignore) {
            ms.use(ignore(config.ignore));
        }

        if (enabled(config.prismic))
            ms.use(prismic(config.prismic));

        if (enabled(config.collections))
            ms.use(collections(config.collections));

        if (enabled(config.writemetadata))
            ms.use(writemetadata(config.writemetadata));

        if (config.markdown)
            ms.use(markdown(config.markdown));

        if (enabled(config.permalinks))
            ms.use(permalinks(config.permalinks));

        if (enabled(config.templates))
            ms.use(templates(config.templates));

        if (enabled(config.htmlminifier))
            ms.use(htmlminifier(config.htmlminifier));
        else if (enabled(config.htmlbeautifier))
            ms.use(htmlbeautifier(config.htmlbeautifier));


        ms.build(callback)
    }
};

