import { describe, it, expect } from "vitest";
import { PaginatedQuery } from "../../server/utils/validators";

describe("Validators", () => {
  describe("PaginatedQuery", () => {
    it("should validate valid pagination query", () => {
      const validQuery = {
        page: 1,
        limit: 20,
        q: "test search",
        category: "pumps",
      };

      const result = PaginatedQuery.safeParse(validQuery);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
        expect(result.data.q).toBe("test search");
        expect(result.data.category).toBe("pumps");
      }
    });

    it("should use default values for missing fields", () => {
      const minimalQuery = {};

      const result = PaginatedQuery.safeParse(minimalQuery);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it("should handle string numbers correctly", () => {
      const queryWithStrings = {
        page: "2",
        limit: "10",
      };

      const result = PaginatedQuery.safeParse(queryWithStrings);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.page).toBe(2);
        expect(result.data.limit).toBe(10);
      }
    });

    it("should reject invalid page values", () => {
      const invalidQuery = {
        page: -1,
        limit: 20,
      };

      const result = PaginatedQuery.safeParse(invalidQuery);
      expect(result.success).toBe(false);
    });

    it("should reject invalid limit values", () => {
      const invalidQuery = {
        page: 1,
        limit: 0,
      };

      const result = PaginatedQuery.safeParse(invalidQuery);
      expect(result.success).toBe(false);
    });

    it("should reject limit values over 100", () => {
      const invalidQuery = {
        page: 1,
        limit: 101,
      };

      const result = PaginatedQuery.safeParse(invalidQuery);
      expect(result.success).toBe(false);
    });
  });
});
