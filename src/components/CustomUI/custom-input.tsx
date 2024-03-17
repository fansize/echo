import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function InputCheck() {
  return (
    <div className="flex pt-4 gap-2 items-center">
      <Input />
      <Button variant={"outline"} aria-label="Toggle bold">
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}
