import Container from "@/components/container/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QA_content_cn } from "@/content/QA-content";
import Nav from "@/components/container/nav";

export default function WikiPage() {
  return (
    <main>
      <Nav />
      <Container>
        <div className="mx-auto max-w-2xl py-4 md:max-w-5xl">
          {/* <h2 className="text-2xl font-semibold tracking-tight">常见问题</h2> */}
          <div className="mx-auto max-w-2xl py-4 md:max-w-7xl">
            <Accordion type="single" collapsible className="w-full">
              {QA_content_cn.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </main>
  );
}
