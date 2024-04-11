import Kbd from "@/components/customUI/kdb";

type Props = {
  text: string;
};

export default function Highlight({ text }: Props) {
  const [kbdText, pText] = text.split(":");

  return (
    <div className="flex flex-row items-center my-4">
      <div>
        <Kbd>{kbdText.trim()}</Kbd>
      </div>
      <div>
        <p className="text-lg">{pText.trim()}</p>
      </div>
    </div>
  );
}
