module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: [["inline-import", { extensions: [".sql"] }]], // <-- add this line
  };
};