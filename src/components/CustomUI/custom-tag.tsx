type Props = {
  text: string;
};

export default function Tag({ text }: Props) {
  return (
    <p className="text-xs font-base py-2 px-6 border rounded-full bg-amber-500 text-white line-clamp-1">
      {text}
    </p>
  );
}
