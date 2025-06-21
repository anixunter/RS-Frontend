export type LayoutConfig = {
  title: Array<{
    name: string;
    link?: string;
  }>;
  action: Array<{
    title: string;
    emit: string;
  }>;
};
