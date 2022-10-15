import { ADDON_ID } from "./constants";
import { useEffect, useState, useGlobals } from "@storybook/addons";
import type { DecoratorFunction, StoryContext, StoryFn as StoryFunction } from "@storybook/addons";

export const withGlobals: DecoratorFunction = (
  StoryFn: StoryFunction,
  context: StoryContext
) => {
  const [oldTheme, setOldTheme] = useState("");
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
        const defaultThemeName = context?.parameters?.selectedTheme;
        const nameSplitter = context?.parameters?.fileName?.replace(".stories.js", "").split("/").slice(2);
        const componentName = nameSplitter.splice((nameSplitter.length - 1), 1);
        const componentPath = `/${nameSplitter.join("/")}/`;

        if (oldTheme) {
          const removeStyle = document.getElementById(oldTheme);
          if (removeStyle) {
            removeStyle.parentNode.removeChild(removeStyle);
          }
        }

        if (defaultThemeName !== themeName) {
          const styleId = `${ADDON_ID.replace(/\//g, "-")}-${componentName}-${themeName}`;
          const stylesheetPath = `${componentPath}${themeName}/${componentName}.${themeName}.css`;

          const addStyle = document.createElement("link");
          addStyle.setAttribute("id", styleId);
          addStyle.setAttribute("rel", "stylesheet");
          addStyle.setAttribute("href", stylesheetPath);
          document.head.appendChild(addStyle);

          setOldTheme(styleId);
        } else {
          setOldTheme("");
        }
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return StoryFn(undefined, undefined);
};
