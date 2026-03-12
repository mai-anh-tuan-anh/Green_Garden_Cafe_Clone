import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ProductRating {
  productId: number;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  userName: string;
}

interface RatingContextType {
  ratings: ProductRating[];
  addRating: (rating: ProductRating) => void;
  getProductAverageRating: (productId: number) => number;
  getProductRatingCount: (productId: number) => number;
  getUserRatingForProduct: (
    productId: number,
    userName: string,
  ) => ProductRating | undefined;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

interface RatingProviderProps {
  children: ReactNode;
}

// Hàm tạo số ngẫu nhiên cho 2 sản phẩm đặc biệt và lưu vào localStorage
const getSpecialProductCounts = () => {
  const saved = localStorage.getItem("specialProductCounts");
  if (saved) {
    return JSON.parse(saved);
  }

  const counts = {
    1: Math.floor(Math.random() * (500 - 300 + 1)) + 300, // Latte Kem Sữa
    2: Math.floor(Math.random() * (500 - 300 + 1)) + 300, // Cappuccino
  };

  localStorage.setItem("specialProductCounts", JSON.stringify(counts));
  return counts;
};

// Số lượng đánh giá ban đầu cố định cho từng sản phẩm (ID 1-31)
const INITIAL_RATING_COUNTS: Record<number, number> = {
  ...getSpecialProductCounts(), // ID 1, 2 - ngẫu nhiên 300-500
  3: 429,
  4: 398,
  5: 456,
  6: 312,
  7: 467,
  8: 389,
  9: 423,
  10: 351,
  11: 478,
  12: 334,
  13: 445,
  14: 367,
  15: 412,
  16: 389,
  17: 467,
  18: 323,
  19: 434,
  20: 398,
  21: 456,
  22: 378,
  23: 423,
  24: 345,
  25: 489,
  26: 367,
  27: 412,
  28: 398,
  29: 434,
  30: 376,
  31: 423,
};

export function RatingProvider({ children }: RatingProviderProps) {
  const [ratings, setRatings] = useState<ProductRating[]>([]);
  const [initialRatingCounts, setInitialRatingCounts] = useState<
    Record<number, number>
  >(INITIAL_RATING_COUNTS);

  useEffect(() => {
    const savedRatings = localStorage.getItem("productRatings");
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings));
    }

    // Lưu số lượng đánh giá ban đầu vào localStorage nếu chưa có
    const savedInitialCounts = localStorage.getItem("initialRatingCounts");
    if (!savedInitialCounts) {
      localStorage.setItem(
        "initialRatingCounts",
        JSON.stringify(INITIAL_RATING_COUNTS),
      );
    } else {
      setInitialRatingCounts(JSON.parse(savedInitialCounts));
    }
  }, []);

  // Cập nhật số lượng đánh giá ban đầu cho sản phẩm mới
  useEffect(() => {
    const customProducts = JSON.parse(
      localStorage.getItem("customProducts") || "[]",
    );
    const updatedCounts = { ...initialRatingCounts };

    customProducts.forEach((product: any) => {
      if (!updatedCounts[product.id]) {
        // Gán số ngẫu nhiên cố định cho sản phẩm mới
        updatedCounts[product.id] = 400;
      }
    });

    if (JSON.stringify(updatedCounts) !== JSON.stringify(initialRatingCounts)) {
      setInitialRatingCounts(updatedCounts);
      localStorage.setItem(
        "initialRatingCounts",
        JSON.stringify(updatedCounts),
      );
    }
  }, [initialRatingCounts]);

  const addRating = (newRating: ProductRating) => {
    const updatedRatings = [...ratings, newRating];
    setRatings(updatedRatings);
    localStorage.setItem("productRatings", JSON.stringify(updatedRatings));
  };

  const getProductAverageRating = (productId: number): number => {
    const productRatings = ratings.filter((r) => r.productId === productId);
    if (productRatings.length === 0) {
      return 0;
    }
    const sum = productRatings.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / productRatings.length) * 10) / 10;
  };

  const getProductRatingCount = (productId: number): number => {
    const actualRatings = ratings.filter((r) => r.productId === productId);
    const actualCount = actualRatings.length;

    if (actualCount > 0) {
      return actualCount;
    }

    // Nếu chưa có đánh giá nào, trả về số lượng ban đầu cố định
    return (
      initialRatingCounts[productId] || INITIAL_RATING_COUNTS[productId] || 0
    );
  };

  const getUserRatingForProduct = (productId: number, userName: string) => {
    return ratings.find(
      (r) => r.productId === productId && r.userName === userName,
    );
  };

  return (
    <RatingContext.Provider
      value={{
        ratings,
        addRating,
        getProductAverageRating,
        getProductRatingCount,
        getUserRatingForProduct,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
}

export function useRating() {
  const context = useContext(RatingContext);
  if (context === undefined) {
    throw new Error("useRating must be used within a RatingProvider");
  }
  return context;
}
