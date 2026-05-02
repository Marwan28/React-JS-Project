const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing Supabase env variables");
}

const getHeaders = () => ({
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
});

const supabaseApi = {
  // GET all
  get: async (table) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("GET error:", error);
      return null;
    }
  },

  // GET by ID
  getById: async (table, id) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
        method: "GET",
        headers: getHeaders(),
      });

      return await res.json();
    } catch (error) {
      console.error("GET BY ID error:", error);
      return null;
    }
  },

  // INSERT
  insert: async (table, data) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: "POST",
        headers: {
          ...getHeaders(),
          Prefer: "return=representation",
        },
        body: JSON.stringify(data),
      });

      return await res.json();
    } catch (error) {
      console.error("INSERT error:", error);
      return null;
    }
  },

  // UPDATE
  update: async (table, id, data) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      return await res.json();
    } catch (error) {
      console.error("UPDATE error:", error);
      return null;
    }
  },

  // DELETE
  remove: async (table, id) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      return res.status === 204 ? true : await res.json();
    } catch (error) {
      console.error("DELETE error:", error);
      return false;
    }
  },

 // GET with filters
getWithFilter: async (table, filters = {}) => {
  try {
    let url = `${SUPABASE_URL}/rest/v1/${table}?`;

    const params = [];

    Object.entries(filters).forEach(([key, value]) => {

      // skip empty values
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        return;
      }

      // search
      if (key === "search") {
        const searchValue = encodeURIComponent(String(value));

        params.push(`title=ilike.*${searchValue}*`);

        return;
      }

      // gte
      if (key.endsWith("_gte")) {
        const column = key.replace("_gte", "");

        params.push(`${column}=gte.${value}`);
      }

      // lte
      else if (key.endsWith("_lte")) {
        const column = key.replace("_lte", "");

        params.push(`${column}=lte.${value}`);
      }

      // ilike
      else if (key.endsWith("_ilike")) {
        const column = key.replace("_ilike", "");

        params.push(`${column}=ilike.*${value}*`);
      }

      // eq
      else {
        params.push(`${key}=eq.${value}`);
      }
    });

    url += params.join("&");

    const res = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    return await res.json();

  } catch (error) {
    console.error("FILTER error:", error);
    return [];
  }
},
};

export default supabaseApi;
