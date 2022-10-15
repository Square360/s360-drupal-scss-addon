import { ADDON_ID } from "./constants";
import { useEffect, useGlobals } from "@storybook/addons";
import type { DecoratorFunction, StoryContext, StoryFn as StoryFunction } from "@storybook/addons";

export const withGlobals: DecoratorFunction = (
  StoryFn: StoryFunction,
  context: StoryContext
) => {
  const [globals, updateGlobals] = useGlobals();

  useEffect(() => {
    const { parameters: { selectedTheme, supportedThemes } } = context;

    if (supportedThemes && !globals?.supportedThemes) {
      if (selectedTheme && !globals?.selectedTheme) {
        updateGlobals({ selectedTheme, supportedThemes });
      } else {
        updateGlobals({ supportedThemes });
      }
    }

    setTimeout(() => {
      switchThemesScss();
    });
  }, [globals]);

  const switchThemesScss = () => {
    try {
      if (globals?.selectedTheme) {
        const themeName = globals?.selectedTheme;
        const defaultTheme = context?.parameters?.selectedTheme === themeName;
        const filenameSplitter = context?.parameters?.fileName?.replace(".stories.js", "").split("/").slice(2);
        const componentName = filenameSplitter.splice((filenameSplitter.length - 1), 1);
        const componentPath = `/${filenameSplitter.join("/")}/`;

        if (defaultTheme) {
          Object.keys(context?.parameters?.supportedThemes || {}).forEach(item => {
            const styleId = `${ADDON_ID.replace(/\//g, "-")}-${componentName}-${item}`;
            const removeStyle = document.getElementById(styleId);
            if (removeStyle) {
              removeStyle.parentNode.removeChild(removeStyle);
            }
          });
        } else {
          const styleId = `${ADDON_ID.replace(/\//g, "-")}-${componentName}-${themeName}`;
          const stylesheetPath = `${componentPath}${themeName}/${componentName}.${themeName}.css`;

          const existStyle = document.getElementById(styleId);

          if (!existStyle) {
            const addStyle = document.createElement("link");
            addStyle.setAttribute("id", styleId);
            addStyle.setAttribute("rel", "stylesheet");
            addStyle.setAttribute("href", stylesheetPath);
            document.head.appendChild(addStyle);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return StoryFn(undefined, undefined);
};
