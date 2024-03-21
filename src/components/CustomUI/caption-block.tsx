type Props = {
  text: string;
};

export default function CaptionBlock({ text }: Props) {
  return (
    <p className="text-base md:text-2xl px-3 py-1 text-amber-500 bg-black/75 rounded-sm">
      {text}
    </p>
  );
}
