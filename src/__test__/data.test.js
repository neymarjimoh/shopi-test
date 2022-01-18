import { paginate, sortDataByName, uniqueID } from "../api/utils/data";

const mockData = [
  {
    id: 1,
    name: "Jimmy",
  },
  {
    id: 2,
    name: "Ade",
  },
  {
    id: 3,
    name: "Ajah",
  },
  {
    id: 4,
    name: "shopify",
  },
  {
    id: 5,
    name: "Chukwuemeka",
  },
  {
    id: 6,
    name: "Kunle",
  },
  {
    id: 7,
    name: "testing",
  },
  {
    id: 8,
    name: "Emma",
  },
  {
    id: 9,
    name: "Sobuur",
  },
  {
    id: 10,
    name: "Goodness",
  },
  {
    id: 11,
    name: "testing",
  },
  {
    id: 12,
    name: "Sodiq",
  },
];

describe("testing data for paginate, uniqueness and sorting", () => {
  it("should paginate the data and return first 10 items", () => {
    const paginatedData = paginate(mockData, 1, 10);
    expect(paginatedData.items.length).toBe(10);
    expect(paginatedData.next.page).toBe(2);
  });

  it("should not paginate the data with page more than expected", () => {
    const paginatedData = paginate(mockData, 3, 10);
    expect(paginatedData.items.length).toBe(0);
  });

  it("should sort the items by name", () => {
    const sortedData = sortDataByName(mockData);
    expect(sortedData[0].name).toBe("Ade");
    expect(sortedData[0].id).toBe(2);
  });

  it("should create uniqued IDs", () => {
    const id1 = uniqueID();
    const id2 = uniqueID();
    expect(id1).not.toEqual(id2);
  });
});
