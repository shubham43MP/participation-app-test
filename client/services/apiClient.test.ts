describe("apiClient", () => {
  const OLD_ENV = process.env;

  beforeAll(() => {
    process.env = { ...OLD_ENV, NEXT_PUBLIC_API_URL: "http://test-api.com" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("makes a GET request and returns data", async () => {
    const mockData = { message: "success" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    // import karne se pehle env set ho chuki hai
    const { apiClient } = await import("./apiClient");

    const result = await apiClient("/test");
    expect(fetch).toHaveBeenCalledWith("http://test-api.com/test", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: undefined,
    });
    expect(result).toEqual(mockData);
  });

  it("makes a POST request with body", async () => {
    const mockData = { id: 1 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const body = { name: "John" };
    const { apiClient } = await import("./apiClient");
    const result = await apiClient("/create", { method: "POST", body });
    expect(fetch).toHaveBeenCalledWith("http://test-api.com/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    expect(result).toEqual(mockData);
  });
});
