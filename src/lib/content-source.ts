export type Block = {
  type: string;
  props?: Record<string, unknown>;
  children?: Block[];
  variant?: string; // optional visual variant for analytics/data attributes
};

export interface PageData {
  title: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  blocks: Block[];
}

export interface ContentSource {
  getPage(
    slug: string[],
    opts?: { preview?: boolean }
  ): Promise<PageData | null>;
  getMenu(): Promise<Array<{ label: string; href: string }>>;
}


