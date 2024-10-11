export enum ComparatorOperator {
  Equal,
  NotEqual,
  IsSet,
  Contains,
  Greater,
  GreaterEqual,
  IsTrue,
  IsFalse,
  Less = 8,
  LessEqual = 9
}

export interface SearchComparator {
  operator: ComparatorOperator;
  value: any;
}

export interface SearchFilter {
  attribute: string;
  comparator: SearchComparator;
}

export enum OrderDir {
  Asc,
  Desc
}

export interface SearchRequest {
  order_by: string;
  order_dir: OrderDir;
  filter: SearchFilter[][];
  take?: number;
}

export interface Model {
  id: number;
}
