import Link from "next/link";
import UploadSubtitle from "../CustomUI/upload-subtitle";
import UploadVideo from "../CustomUI/upload-video";

type Props = {
    selectedTag?: number;
};

export default function UploadPanel() {
    const tags = [{ text: "Easy" }, { text: "Medium" }, { text: "Hard" }];

    return (
        <>
            {/* <UploadSubtitle />
            <UploadVideo /> */}

            <Link as={`/episodes/${"upload"}`} href="/episodes/[slug]">
                start</Link>
        </>
    );
}
