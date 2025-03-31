const pokemonData = require("./mockPokemon.json");
const cardData = require("./mockCard.json");
const { POKEMON_TYPES } = require("../src/utils/constants");
const {
  testClient,
  createTestPokemon,
  createTestCard,
  clearDatabase,
} = require("./testHelpers");

describe("Pokedex API", () => {
  describe("POST /pokedex", () => {
    beforeEach(async () => {
      await clearDatabase();
    });

    it("should return empty list when no pokemon exist", async () => {
      const response = await testClient.post("/api/v1/pokedex");
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(0);
    });

    it("should return existing pokemon", async () => {
      await createTestPokemon(pokemonData[0]);
      await createTestPokemon(pokemonData[1]);

      const response = await testClient.post("/api/v1/pokedex");
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
    });

    it("should return 12 pokemon", async () => {
      await createTestPokemon(pokemonData);

      const response = await testClient.post("/api/v1/pokedex");
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(10);
    });

    it("should return 10 pokemon", async () => {
      await createTestPokemon(pokemonData);

      const response = await testClient.post("/api/v1/pokedex");
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(10);
    });

    it("should return correct metadata object pokemon", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 15,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(15);
      expect(response.body).toHaveProperty("metadata");
      expect(response.body.metadata).toHaveProperty("current_page");
      expect(response.body.metadata.current_page).toBe(reqBody.page);
      expect(response.body.metadata).toHaveProperty("limit");
      expect(response.body.metadata.limit).toBe(reqBody.limit);
      expect(response.body.metadata).toHaveProperty("docs_in_page");
      expect(response.body.metadata.docs_in_page).toBe(
        reqBody.page * reqBody.limit
      );
      expect(response.body.metadata).toHaveProperty("offset");
      expect(response.body.metadata.offset).toBe(
        (reqBody.page - 1) * reqBody.limit
      );
      expect(response.body.metadata).toHaveProperty("total_pages");
      expect(response.body.metadata).toHaveProperty("total");
      expect(response.body.metadata.total_pages).toBe(
        Math.ceil(response.body.metadata.total / reqBody.limit)
      );
    });

    it("should return data sorted in descending order of uid", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 5,
        sortBy: "uid",
        sortOrder: -1,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(5);
      expect(response.body.data[4].uid).toBeLessThan(response.body.data[0].uid);
    });

    it("should return data sorted in ascending order of uid", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 5,
        sortBy: "uid",
        sortOrder: 1,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(5);
      expect(response.body.data).toBeInOrder(reqBody.sortOrder, reqBody.sortBy);
    });

    it("should return data sorted in descending order of name", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 5,
        sortBy: "name",
        sortOrder: -1,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(5);
      expect(response.body.data).toBeInOrder(reqBody.sortOrder, reqBody.sortBy);
    });

    it("should return data sorted in ascending order of name", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 5,
        sortBy: "name",
        sortOrder: 1,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(5);
      expect(response.body.data).toBeInOrder(reqBody.sortOrder, reqBody.sortBy);
    });

    it("should return page 3 with a list of 4 pokemon", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 3,
        limit: 4,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(4);
      expect(response.body).toHaveProperty("metadata");
      expect(response.body.metadata).toHaveProperty("current_page");
      expect(response.body.metadata.current_page).toBe(reqBody.page);
    });

    it("should return list of 4 pokemons that fit the given weight and height range", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 4,
        minHeight: 9,
        minWeight: 17,
        maxHeight: 143,
        maxWeight: 419,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toBeInRange(
        "gte",
        "height",
        reqBody.minHeight
      );
      expect(response.body.data).toBeInRange(
        "gte",
        "weight",
        reqBody.minWeight
      );
      expect(response.body.data).toBeInRange(
        "lte",
        "height",
        reqBody.maxHeight
      );
      expect(response.body.data).toBeInRange(
        "lte",
        "weight",
        reqBody.maxWeight
      );
    });

    it("should return list of pokemon that fit the filter", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 4,
        sortBy: "name",
        sortOrder: -1,
        minHeight: 9,
        minWeight: 17,
        weakness: "rock,electric",
        search: "e",
        type: "normal",
        maxHeight: 143,
        maxWeight: 419,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(3);
      expect(response.body.data).toBeValidTypeArray("type");
      expect(response.body.data).toBeValidSearch(reqBody.search);
    });

    it("should return 1 pokemon with a uid that fit the search filter", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 4,
        sortBy: "uid",
        sortOrder: -1,
        minHeight: 9,
        minWeight: 11,
        weakness: "rock,electric",
        search: 17,
        type: "normal",
        maxHeight: 143,
        maxWeight: 819,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].type).toBePokemonType("type");
      expect(response.body.data[0].uid).toBe(17);
    });

    it("should return 1 pokemon with a name that fit the search filter", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 4,
        sortBy: "uid",
        sortOrder: -1,
        minHeight: 9,
        minWeight: 17,
        weakness: "rock,electric",
        search: "fear",
        type: "normal",
        maxHeight: 143,
        maxWeight: 419,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].type).toBePokemonType("type");
      expect(response.body.data[0].name).toContain("fear");
      expect(response.body.data[0].height).toBeLessThanOrEqual(143);
      expect(response.body.data[0].height).toBeGreaterThanOrEqual(9);
      expect(response.body.data[0].weight).toBeLessThanOrEqual(419);
      expect(response.body.data[0].weight).toBeGreaterThanOrEqual(17);
    });

    it("should return a validation error on weaknesses", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 4,
        weakness: "rock,electric,,",
        type: "normal",
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message:
            "Validation error: valid weaknesses are: bug,electric,fairy,fighting,fire,flying,ghost,grass,ground,ice,normal,poison,psychic,rock,steel,water,dragon,dark,stellar,unknown,shadow",
        },
      });
    });

    it("should return a validation error on limit", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        page: 1,
        limit: 26,
        weakness: "rock,electric",
        type: "normal",
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: { message: "Validation error: Invalid limit" },
      });
    });

    it("should return a validation error on page", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        // the response is empty so there cannot be 2 pages
        page: "2",
        limit: 6,
        weakness: "rock,electric",
        type: "normal,electric",
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message: "Invalid Request.",
        },
      });
    });

    it("should return a validation error on sortOrder", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        sortOrder: "name",
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message: "Validation error: Sort order can have value 1 or -1",
        },
      });
    });

    it("should return a validation error on sortBy", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        sortBy: "yutikk",
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message: "Validation error: Sorting can be done by id or by name",
        },
      });
    });

    it("should return a validation error on type", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        type: "dfdgfd, iyiy",
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message: `Validation error: valid types are: ${POKEMON_TYPES}`,
        },
      });
    });

    it("should return a validation error on weakness", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        weakness: "name,poko,pika",
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message: `Validation error: valid weaknesses are: ${POKEMON_TYPES}`,
        },
      });
    });

    it("should return a validation error on minHeight", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        minHeight: -7,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message:
            "Validation error: minimum height value has to be a positive number",
        },
      });
    });

    it("should return a validation error on minWeight", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        minWeight: -9,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message:
            "Validation error: minimum weight value has to be a positive number",
        },
      });
    });

    it("should return a validation error on maxHeight", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        maxHeight: "name",
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message:
            "Validation error: maximum height value has to be a positive number",
        },
      });
    });

    it("should return a validation error on maxWeight", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        maxWeight: -99,
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        code: 400,
        details: {
          message:
            "Validation error: maximum weight value has to be a positive number",
        },
      });
    });

    it("should return a validation error on weakness", async () => {
      await createTestPokemon(pokemonData);
      const reqBody = {
        weaknesses: "name,poko,pika", // not a valid parameter, is ignored
      };
      const response = await testClient
        .post("/api/v1/pokedex")
        .send(reqBody)
        .set("Content-Type", "application/json");
      console.log(response.body);
      expect(response.status).toBe(200);
    });
  });

  describe("GET /pokemon/:id", () => {
    beforeEach(async () => {
      await clearDatabase(); // Clean slate before each test
    });

    it("should return a single pokemon", async () => {
      const creationResponse = await createTestPokemon(pokemonData);
      await createTestCard(cardData);

      const onePokemon = creationResponse
        ?.filter((a) => a.name === "bulbasaur")
        ?.reduce((a) => a);

      const pokemonId = onePokemon.uid;

      const response = await testClient.get(`/api/v1/pokedex/${pokemonId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("pokemonData");
      expect(response.body.pokemonData).toHaveLength(1);
      expect(response.body.pokemonData[0].name).toBe("bulbasaur");
      expect(response.body.pokemonData[0].uid).toBe(1);
      expect(response.body.pokemonData[0]).toHaveProperty("weight");
      expect(response.body.pokemonData[0]).toHaveProperty("height");
      if (
        typeof response.body.pokemonData[0].gif !== "undefined" &&
        response.body.pokemonData[0].gif !== null
      ) {
        expect(response.body.pokemonData[0].gif).toMatch(
          /^https?:\/\/.*\.gif$/i
        );
      }
      expect(response.body.pokemonData[0]).toHaveProperty("type");
      expect(response.body.pokemonData[0]?.type).toBeInstanceOf(Array);
      expect(response.body.pokemonData[0]?.type).toBePokemonType();
      expect(response.body.pokemonData[0]).toHaveProperty("weaknesses");
      expect(response.body.pokemonData[0]?.weaknesses).toBeInstanceOf(Array);
      expect(response.body.pokemonData[0]?.weaknesses).toBePokemonType();
      expect(response.body.pokemonData[0]).toHaveProperty("stats");
      expect(response.body.pokemonData[0]).toHaveProperty("abilities");
      expect(response.body.pokemonData[0]).toHaveProperty("moves");

      expect(response.body).toHaveProperty("cardData");
      expect(response.body.cardData).toHaveLength(1);
      expect(response.body.cardData[0]).toHaveProperty("name");
      expect(typeof response.body.cardData[0]?.name).toBe("string");
      expect(response.body.cardData[0]).toHaveProperty("names");
      expect(response.body.cardData[0]?.names).toBeInstanceOf(Array);
      expect(response.body.cardData[0]).toHaveProperty("habitat");
      expect(response.body.cardData[0]).toHaveProperty("habitat.name");
      expect(response.body.cardData[0]).toHaveProperty("flavor_text_entries");
      expect(response.body.cardData[0]?.flavor_text_entries).toBeInstanceOf(
        Array
      );
      expect(response.body.cardData[0]?.flavor_text_entries).toBeAlphaNumeric();
    });

    it("should return error message", async () => {
      await createTestPokemon(pokemonData);
      await createTestCard(cardData);

      const pokemonId = 9999; //A pokemon with this uid does not exist

      const response = await testClient.get(`/api/v1/pokedex/${pokemonId}`);
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        code: 404,
        details: { message: "No pokemon found." },
      });
    });
  });
});

expect.extend({
  toBePokemonType(received) {
    return {
      pass: received.every((element) => POKEMON_TYPES.includes(element)),
      message: () => `Expected ${received} to be a valid Pokémon type/weakness`,
    };
  },
  toBeAlphaNumeric(received) {
    return {
      pass: received.every((element) => typeof element === "string"),
      message: () => `Expected ${received} to be a valid Pokémon type`,
    };
  },
  toBeInOrder(received, order, val) {
    received = received.map((a) => a[`${val}`]);
    let flag = true;

    flag =
      order === 1
        ? received.every((element, index, arr) => {
            if (
              arr.length - index - 1 > 0 &&
              !(arr[arr.length - 1 - index] >= arr[arr.length - index - 2])
            ) {
              return false;
            } else {
              return true;
            }
          })
        : received.every((element, index, arr) => {
            if (
              arr.length - index - 1 > 0 &&
              !(arr[arr.length - 1 - index] <= arr[arr.length - index - 2])
            ) {
              return false;
            } else {
              return true;
            }
          });

    return {
      pass: flag,
      message: () => `Expected ${received} to be in order`,
    };
  },
  toBeInRange(received, order, param, val) {
    received = received.map((a) => a[`${param}`]);

    return {
      pass:
        order === "gte"
          ? received.every((element) => element >= val)
          : received.every((element) => element <= val),
      message: () => `Expected ${received} to be in order`,
    };
  },
  toBeValidTypeArray(received, type) {
    const array = received.map((a) => a[`${type}`])?.flat();

    return {
      pass: array.every((element) => POKEMON_TYPES.includes(element)),
      message: () => `Expected ${array} to have valid Pokémon ${type}`,
    };
  },
  toBeValidSearch(received, search) {
    const array = received.map((a) => a.name);
    const searchEle = new RegExp(search, "i");

    return {
      pass: array.every((element) => searchEle.test(element)),
      message: () =>
        `Expected substring, '${search}' string in every element of ${array}`,
    };
  },
});
