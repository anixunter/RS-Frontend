export type TabulatorColumn = {
  field: string;
  title: string;
  headerFilter?: boolean;
  headerFilterPlaceholder?: string;
  width?: string;
  formatter?: function;
};
