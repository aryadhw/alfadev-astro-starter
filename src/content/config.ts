import type { Testimonial } from "@/components/Testimonial.astro";
import type { Section } from "@/components/core/Section.astro";
import type { LinkButton, PageType } from "@/content/page.types";
import { defineCollection, z } from "astro:content";

const zodPageConfig = z.custom<PageType>();

// Pages collection schema
const pagesCollection = defineCollection({
  type: "content",
  schema: zodPageConfig,
});

const indexSchema = z.intersection(
  z.object({
    banner: z.custom<Section>(),
    features: z.object({
      title: z.string(),
      description: z.string(),
      feature_list: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          icon: z.string(),
        }),
      ),
    }),
    testimonial: z.custom<Testimonial>(),
    call_to_action: z.object({
      title: z.string(),
      description: z.string(),
      button: z.custom<LinkButton>(),
    }),
  }),
  zodPageConfig,
);

const indexPage = defineCollection({
  type: "content",
  schema: indexSchema,
});

// Services schema
const servicesSchema = z.intersection(
  z.object({
    banner: z.custom<Section>(),
    stats: z.array(
      z.object({
        number: z.string(),
        label: z.string(),
        icon: z.string(),
      }),
    ).optional(),
    features: z.object({
      title: z.string(),
      description: z.string(),
      feature_list: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          icon: z.string(),
        }),
      ),
    }).optional(),
    pricing: z.object({
      title: z.string(),
      caption: z.string().optional(),
      description: z.string(),
      show_toggle: z.boolean().optional(),
      plans: z.array(
        z.object({
          name: z.string(),
          subtitle: z.string(),
          price: z.string(),
          period: z.string(),
          badge: z.string().optional(),
          features: z.array(z.string()),
          button: z.custom<LinkButton>(),
        }),
      ),
    }).optional(),
    testimonial: z.custom<Testimonial>().optional(),
    faq: z.object({
      title: z.string(),
      questions: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      ),
    }).optional(),
    call_to_action: z.object({
      title: z.string(),
      description: z.string(),
      button: z.custom<LinkButton>(),
    }),
  }),
  zodPageConfig,
);

const servicesCollection = defineCollection({
  type: "content",
  schema: servicesSchema,
});

// Export collections
export const collections = {
  about: pagesCollection,
  changelog: pagesCollection,
  contact: pagesCollection,
  features: pagesCollection,
  homepage: indexPage,
  pages: pagesCollection,
  services: servicesCollection,
};
