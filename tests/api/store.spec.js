const { test, expect, request } = require("@playwright/test");

const storeData = {
  order: {
    id: 12345,
    petId: 101,
    quantity: 1,
    shipDate: "2026-03-04T10:00:00.000Z",
    status: "placed",
    complete: true,
  },
};

test.describe("Store API Tests", () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: "https://petstore.swagger.io/v2",
    });
  });

  test("Place Order", async () => {
    const response = await apiContext.post("/store/order", {
      data: storeData.order,
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.id).toBe(storeData.order.id);
  });

  test("Find Purchase Order by ID", async () => {
    const response = await apiContext.get(`/store/order/${storeData.order.id}`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.id).toBe(storeData.order.id);
  });

  test("Delete Purchase Order", async () => {
    const response = await apiContext.delete(
      `/store/order/${storeData.order.id}`,
    );
    expect(response.ok()).toBeTruthy();
  });
});
