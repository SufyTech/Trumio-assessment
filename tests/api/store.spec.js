// tests/api/store.spec.js
import { test, expect, request } from "@playwright/test";

test.describe("Store API Tests", () => {
  let apiContext;
  let storeData;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: "https://petstore.swagger.io/v2",
      extraHTTPHeaders: { "Content-Type": "application/json" },
    });

    const randomId = Math.floor(Math.random() * 100000);
    const petId = randomId + 1000;

    storeData = {
      pet: {
        id: petId,
        name: `TempPet-${petId}`,
        photoUrls: [],
        status: "available",
      },
      order: {
        id: randomId,
        petId,
        quantity: 1,
        shipDate: new Date().toISOString(),
        status: "placed",
        complete: true,
      },
    };

    // Create pet
    const petResponse = await apiContext.post("/pet", { data: storeData.pet });
    expect(petResponse.ok()).toBeTruthy();

    // Create order once
    const orderResponse = await apiContext.post("/store/order", {
      data: storeData.order,
    });
    expect(orderResponse.ok()).toBeTruthy();
  });

  test("Place Order", async () => {
    const response = await apiContext.get(`/store/order/${storeData.order.id}`);
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
