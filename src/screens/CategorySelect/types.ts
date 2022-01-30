export interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export interface Category {
  key: string;
  name: string;
}

export interface CategoryProps {
  isActive: boolean;
}
