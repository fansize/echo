import Container from "@/components/container/container";
import UploadPanel from "@/components/upload-file/upload-subtitle";

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
