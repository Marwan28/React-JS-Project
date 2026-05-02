import supabaseApi from "../config/supabaseApi";

export const propertyService = {
  async getFeatured() {
    return await supabaseApi.getWithFilter("properties", {
      featured: true,
    });
  },

  async getAll(filters) {
    return await supabaseApi.getWithFilter("properties", filters);
  },

  async search(query, filters = {}) {
    return await supabaseApi.getWithFilter("properties", {
      ...filters,
      search: query,
    });
  },

  async getById(id) {
    return await supabaseApi.getById("properties", id);
  },
};
