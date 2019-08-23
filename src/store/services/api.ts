type Params = {
  page: number;
  query: Search['phrase'];
  year?: Search['year'];
};

const Helper = {
  mapResults({ results, total_results, page, total_pages }: ApiMovies): Movies {
    return {
      page,
      pages: total_pages,
      total: total_results,
      movies: results.map(Helper.mapResult)
    };
  },
  mapResult({
    id,
    overview,
    poster_path,
    release_date,
    title,
    vote_average
  }: ApiMovie): Movie {
    return {
      id,
      date: release_date,
      image: poster_path
        ? {
            small: `https://image.tmdb.org/t/p/w92${poster_path}`,
            medium: `https://image.tmdb.org/t/p/w300${poster_path}`,
            large: `https://image.tmdb.org/t/p/w780${poster_path}`
          }
        : undefined,
      title,
      overview,
      vote: vote_average
    };
  },
  prepareUrl(params: Params): string {
    const basePath = 'https://api.themoviedb.org/3';

    let queryParams = `api_key=03c93abb1975c0c02a167e1b3e8b63d4&page=${
      params.page
    }&query=${params.query}`;
    if (params.year) {
      queryParams = `${queryParams}&year=${params.year}`;
    }

    return `${basePath}/search/movie?${queryParams}`;
  }
};

export const API = {
  async getMovies(
    page: number,
    { phrase: query, year }: Search
  ): Promise<Movies> {
    const response: Response = await fetch(
      Helper.prepareUrl({ page, query, year })
    );
    const data: ApiMovies = await response.json();

    return Helper.mapResults(data);
  }
};
