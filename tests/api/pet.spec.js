const { test, expect, request } = require("@playwright/test");

test.describe("Swagger Pet Store API", () => {
  const petId = Math.floor(Math.random() * 100000); // unique pet ID

  test("Add a new pet", async ({ request }) => {
    const response = await request.post("https://petstore.swagger.io/v2/pet", {
      data: {
        id: petId,
        name: "TestPet",
        photoUrls: [],
        status: "available",
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe("TestPet");
  });

  test("Update existing pet", async ({ request }) => {
    const response = await request.put("https://petstore.swagger.io/v2/pet", {
      data: {
        id: petId,
        name: "UpdatedPet",
        photoUrls: [],
        status: "sold",
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe("UpdatedPet");
  });

  test("Find pet by ID", async ({ request }) => {
    const response = await request.get(
      `https://petstore.swagger.io/v2/pet/${petId}`,
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(petId);
  });

  test("Delete pet", async ({ request }) => {
    const response = await request.delete(
      `https://petstore.swagger.io/v2/pet/${petId}`,
    );
    expect(response.status()).toBe(200);
  });

  // Optional: Store endpoints
  const orderId = Math.floor(Math.random() * 100000);

  test("Place a new order", async ({ request }) => {
    const response = await request.post(
      "https://petstore.swagger.io/v2/store/order",
      {
        data: {
          id: orderId,
          petId,
          quantity: 1,
          status: "placed",
          complete: true,
        },
      },
    );
    expect(response.status()).toBe(200);
  });

  test("Find purchase order by ID", async ({ request }) => {
    const response = await request.get(
      `https://petstore.swagger.io/v2/store/order/${orderId}`,
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(orderId);
  });

  test("Delete purchase order", async ({ request }) => {
    const response = await request.delete(
      `https://petstore.swagger.io/v2/store/order/${orderId}`,
    );
    expect(response.status()).toBe(200);
  });
});
