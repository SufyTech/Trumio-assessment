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
        petId: petId,
        quantity: 1,
        shipDate: new Date().toISOString(),
        status: "placed",
        complete: true,
      },
    };
  });

  test("Add a new pet", async () => {
    const response = await apiContext.post("/pet", { data: storeData.pet });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe(storeData.pet.name);
    console.log("✅ Pet added successfully:", body.name);
  });

  test("Update existing pet", async () => {
    const updatedName = `${storeData.pet.name}-Updated`;
    const response = await apiContext.put("/pet", {
      data: { ...storeData.pet, name: updatedName },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe(updatedName);
    console.log("✅ Pet updated successfully:", body.name);
  });

  test("Find pet by ID", async () => {
    const response = await apiContext.get(`/pet/${storeData.pet.id}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(storeData.pet.id);
    console.log("✅ Pet fetched successfully:", body.name);
  });

  test("Delete pet", async () => {
    const response = await apiContext.delete(`/pet/${storeData.pet.id}`);
    expect(response.status()).toBe(200);

    console.log("✅ Pet deleted successfully with ID:", storeData.pet.id);
  });

  test("Place an order for pet", async () => {
    const response = await apiContext.post("/store/order", {
      data: storeData.order,
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(storeData.order.id);
    console.log("✅ Order placed successfully:", body.id);
  });

  test("Find purchase order by ID", async () => {
    const response = await apiContext.get(`/store/order/${storeData.order.id}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(storeData.order.id);
    console.log("✅ Order fetched successfully:", body.id);
  });

  test("Delete purchase order", async () => {
    const response = await apiContext.delete(
      `/store/order/${storeData.order.id}`,
    );
    expect(response.status()).toBe(200);

    console.log("✅ Order deleted successfully with ID:", storeData.order.id);
  });
});
