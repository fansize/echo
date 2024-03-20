export type Caption = {
  index: number;
  start: string;
  end: string;
  text: string;
};

export const ParseSubtitles = async (
  subtitleUrl: string
): Promise<Caption[]> => {
  const response = await fetch(subtitleUrl);
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = (event.target as FileReader).result;
      if (typeof text !== "string") {
        return;
      }

      const subtitleBlocks = text.trim().split(/\n\s*\n/);

      const parsed = subtitleBlocks
        .map((subtitleBlock) => {
          let [indexString, timeString, ...textLines] =
            subtitleBlock.split("\n");
          const index = parseInt(indexString);
          const [start, end] = timeString.split(" --> ");
          const text = textLines
            .join("\n")
            .replace(/<[^>]*>/g, "")
            .replace(/\{.*?\}/g, "");

          if (isNaN(index) || !start || !end) {
            return null;
          }

          return { index, start, end, text };
        })
        .filter(
          (
            item
          ): item is {
            index: number;
            start: string;
            end: string;
            text: string;
          } => item !== null
        );
      resolve(parsed);
    };

    reader.onerror = () => {
      reject("Error reading blob");
    };

    reader.readAsText(blob);
  });
};
