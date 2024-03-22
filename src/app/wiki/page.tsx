import Container from "@/components/CustomUI/container";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { QA_content_cn } from "@/content/QA-content";


export default function WikiPage() {
    return (
        <main>
            <Container>

                <div className="mx-auto max-w-2xl py-8 md:max-w-4xl">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        常见问题
                    </h2>
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




