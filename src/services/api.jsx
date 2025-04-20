export const getAnimeByIds = async (ids) => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      return data.data;
    })
  );
  return results;
};
