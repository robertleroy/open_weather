import { fail } from '@sveltejs/kit';

export const actions = {
  search: async ({ request, fetch }) => {
    const formData = await request.formData();
    const searchTerm = formData.get("searchTerm");

    if (searchTerm.length < 3) {
      return fail(400, {searchTerm, badrequest: true, message: "bad request"})
    }
    
    const res = await fetch(`api/tomtom`, {
      method: "POST",
      body: JSON.stringify(searchTerm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newLocation = await res.json();

    return {
      newLocation: await newLocation
    };
  },
};
