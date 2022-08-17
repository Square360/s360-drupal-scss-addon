# Storybook Addon Drupal SCSS Theming
Storybook addon to show themes and use ecosystem for global theme value.

## Installation

From the root of your repo:

```console
yarn add -D @s360/drupal-scss-addon
```

## Getting started

First enable the addon. Add it to the `addons` in the `.storybook/main.js`.

```javascript
// .storybook/main.js
module.exports = {
  // ...
  addons: [
    // ...
    '@s360/drupal-scss-addon',
  ],
  // ...
};
```

Then, configure the `supportedThemes` and `selectedTheme` parameters in `.storybook/preview.js`.

`supportedThemes` is an object where the keys are the id's of dropdown and value are theme name which will show in dropdown of storybook preview toolbar.

```javascript
// .storybook/preview.js
export const parameters = {
  // ...
  selectedTheme: 'economics',
  supportedThemes: {
    economics: "Economics",
    cowles: "Cowles"
  },
  // ...
};
```

## Start Storybook

```console
yarn storybook
```

# Usage in Stories

The currently selected theme is available in the `selectedTheme` globally, you can access it in `MyComponent.stories.js`. eg:

```js
const Template = (args, { globals: { selectedTheme } }) => {
  console.log("Template selectedTheme:", selectedTheme);

  return <Button {...args} selectedTheme={selectedTheme} />;
};
```
