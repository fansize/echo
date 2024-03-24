import Container from "@/components/CustomUI/container";
import UploadPanel from "@/components/CustomUI/upload-subtitle";

export default function UploadPage() {
  return (
    <main>
      <Container>
        <div className="p-8">
          <UploadPanel />
        </div>
      </Container>
    </main>
  );
}
