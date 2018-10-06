function HtmlStringReplace(options) {
  this.patterns = options.patterns || [];

  // Disables the plugin when passing `disable` param
  this.disable = options.disable;
}

HtmlStringReplace.prototype.apply = function apply(compiler) {
  compiler.hooks.compilation.tap('HtmlStringReplace', (compilation) => {
    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('HtmlStringReplace', (pluginArgs, callback) => {
      const newPluginArgs = { ...pluginArgs };

      if (!this.disable) {
        newPluginArgs.html = this.replaceString(newPluginArgs.html);
      }

      callback(null, newPluginArgs);
    });
  });
};

HtmlStringReplace.prototype.replaceString = function replaceString(html) {
  let newHtml = html;

  this.patterns.forEach((pattern) => {
    const match = pattern.match;
    const replacement = pattern.replacement;

    newHtml = newHtml.replace(match, replacement);
  });

  return newHtml;
};

module.exports = HtmlStringReplace;
