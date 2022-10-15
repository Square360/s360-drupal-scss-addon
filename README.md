# Storybook Addon Drupal SCSS Theming
Storybook addon to show themes and use cohesive ecosystem for global theme value. Addon will place other theme stylesheets on head of story book and remove on switch component or change theme.

## Installation

From the root of your repo:

```console
yarn add -D @square360/drupal-scss-addon
```

## Getting started

First enable the addon. Add it to the `addons` in the `.storybook/main.js`.

```javascript
// .storybook/main.js
module.exports = {
  // ...
  addons: [
    // ...
    '@square360/drupal-scss-addon',
  ],
  // ...
};
```

Then, configure the `supportedThemes` and `selectedTheme` parameters in `.storybook/preview.js`.

`supportedThemes` is an object where the keys are the IDs of the dropdown, and the values are the theme names that will show in the dropdown of the storybook preview toolbar.

```javascript
// .storybook/preview.js
export const parameters = {
  // ...
  selectedTheme: "primary",
  supportedThemes: {
    primary: "Primary",
    secondary: "Secondary"
  },
  // ...
};
```

## Start Storybook

```console
yarn storybook
```

# Usage in Stories

The currently selected theme is available in `selectedTheme` globally, you can access it in `MyComponent.stories.js`. eg:

```js
const Template = (args, { globals: { selectedTheme } }) => {
  console.log("Template selectedTheme:", selectedTheme);

  return <Button {...args} selectedTheme={selectedTheme} />;
};
```

# Usage with CSS

There is another way to use this addon. You just enable `../dist/` staticDir in `.storybook/main.js` globally.

```js
module.exports = {
  stories: [
    '../src/**/*.stories.@(js|ts)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@square360/drupal-scss-addon',
  ],
  staticDirs: [
    '../dist/', // this one
    './fontawesome'
  ],
};
```

Now your directory structure should be like this:

```shell
/{component-name}
  {component-name}.stories.js
  {component-name}.js
  {component-name}.scss
  {component-name}.twig
  {component-name}.yml
  /{theme-name}
    {component-name}.{theme-name}.js
    {component-name}.{theme-name}.scss
    {component-name}.{theme-name}.yml (optional)
    {component-name}.{theme-name}.twig (optional)
```

The above should create the following files inside the `dist` folder on root:

```shell
{component-name}/{component-name}.css
{component-name}/{component-name}.js
{component-name}/{theme-name}/{component-name}.{theme-name}.css
{component-name}/{theme-name}/{component-name}.{theme-name}.js
```
By following the above instruction addon will call css files according the story component loaded and theme changes from dropdown.

<!--
npm login
npm publish --access public
-->
