import type { Product, Solution, ProductCategory, ZoneType } from '../types';
import { productsData } from '../data/products';
import { solutionsData } from '../data/solutions';

export function getAllProducts(): Product[] {
  return productsData;
}

export function getAllSolutions(): Solution[] {
  return solutionsData;
}

export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id);
}

export function getSolutionById(id: string): Solution | undefined {
  return solutionsData.find((s) => s.id === id);
}

/**
 * Ключевая двусторонняя связь:
 * Находит все готовые решения, в которых действительно применен данный товар.
 */
export function getSolutionsForProduct(productId: string): Solution[] {
  return solutionsData.filter((solution) => solution.productIds.includes(productId));
}

/**
 * Обратная двусторонняя связь:
 * Находит все товары, входящие в состав данного готового решения.
 */
export function getProductsForSolution(solution: Solution): Product[] {
  return solution.productIds
    .map((productId) => getProductById(productId))
    .filter((p): p is Product => Boolean(p));
}

/**
 * Группирует товары готового решения по 3 ключевым направлениям:
 * Материалы, Мебель, Оборудование.
 */
export function getProductsGroupedForSolution(solution: Solution): {
  materials: Product[];
  furniture: Product[];
  equipment: Product[];
} {
  const products = getProductsForSolution(solution);
  return {
    materials: products.filter((p) => p.category === 'materials'),
    furniture: products.filter((p) => p.category === 'furniture'),
    equipment: products.filter((p) => p.category === 'equipment'),
  };
}

/**
 * Рекомендуемые сопутствующие товары
 */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return productsData
    .filter((p) => p.id !== product.id && (p.category === product.category || p.zones.some((z) => product.zones.includes(z))))
    .slice(0, limit);
}

export function formatCategoryName(category: ProductCategory): string {
  switch (category) {
    case 'materials':
      return 'Материалы';
    case 'furniture':
      return 'Мебель';
    case 'equipment':
      return 'Оборудование';
    default:
      return category;
  }
}

export function formatZoneName(zone: ZoneType): string {
  switch (zone) {
    case 'pool':
      return 'Зона бассейна';
    case 'bbq':
      return 'Зона барбекю';
    case 'patio':
      return 'Патио';
    case 'terrace':
      return 'Терраса';
    case 'pathways':
      return 'Дорожки и мощение';
    default:
      return zone;
  }
}
