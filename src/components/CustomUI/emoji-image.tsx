type Props = {
  emoji: string;
};

export default function EmojiImage({ emoji }: Props) {
  return (
    <>
      <img
        src={`data:image/svg+xml,${encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="100">' +
            emoji +
            "</text></svg>"
        )}`}
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
        alt="Topic Emoji"
      />
    </>
  );
}
