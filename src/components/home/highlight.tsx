import Kbd from "@/components/CustomUI/kdb";

type Props = {
    text: string;
};

export default function Highlight({ text }: Props) {
    const [kbdText, pText] = text.split(':');

    return (
        <div className="flex flex-row gap-4 my-4">
            <Kbd>{kbdText.trim()}</Kbd>
            <p className="text-lg">{pText.trim()}</p>
        </div>
    );
}
