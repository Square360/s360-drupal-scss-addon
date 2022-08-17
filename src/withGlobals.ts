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
  }, [globals]);

  return StoryFn(undefined, undefined);
};
