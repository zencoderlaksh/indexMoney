import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How will I receive trade updates?",
    answer:
      "Trade updates are shared via WhatsApp broadcast so you can stay connected in real time.",
  },
  {
    question: "When will my plan activate?",
    answer:
      "Your plan will activate within 10–30 minutes after payment verification.",
  },
  {
    question: "Do you guarantee profit?",
    answer:
      "No, we provide research-based guidance only. All investments are subject to market risk.",
  },
  {
    question: "Can I switch plans after subscribing?",
    answer:
      "Yes — reach out to our support team and we can help you move to the plan that best fits your needs.",
  },
];

const FAQSection = () => {
  return (
    <section className="pt-16 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Need clarity? Here are some of the most common questions we receive
          from new subscribers.
        </p>
      </div>

      <div className="mt-8 max-w-3xl">
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
