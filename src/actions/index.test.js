import moxios from "moxios";

import {
  storeFactory
} from "../test/testUtils";
import {
  loadInitialMovies,
  updateMoviesSearch,
  getLatestMovieId,
  updateMoviesRandom,
  updateMoviesFilter,
} from ".";

import * as helper from '../helpers/helpersTs'

import * as actionHelper from './helpers'

describe("test action creators", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("loadInitialMovies adds results to the state", () => {
    const payload = {
      results: [{
          title: "Cool Movie",
        },
        {
          title: "Cool Movie 2",
        },
      ],
      total_pages: 10,
      total_results: 1
    };

    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload,
      });
    });

    return store.dispatch(loadInitialMovies()).then(() => {
      const newState = store.getState();
      const newStateMovies = newState.moviesList.movies

      expect(newStateMovies).toBe(payload.results);
    });
  });
  test("updateMoviesSearch updates state correctly", () => {
    const payload = {
      results: [{
          title: "Cool Movie",
        },
        {
          title: "Cool Movie 2",
        },
      ],
      total_pages: 10,
      total_results: 1
    };

    const store = storeFactory();

    const searchWord = 'test'

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload,
      });
    });

    return store.dispatch(updateMoviesSearch(searchWord)).then(() => {
      const newState = store.getState();
      const newStatePayload = newState.moviesList

      expect(newStatePayload.movies).toBe(payload.results);
      expect(newStatePayload.totalPages).toBe(payload.total_pages);
      expect(newStatePayload.totalResults).toBe(payload.total_results);
    })

  })

  test("getLatestMovieId works correctly", async () => {
    const latestMovie = {
      title: 'latest Movie',
      id: 100
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: latestMovie,
      });
    })

    const getLatestMovie = await getLatestMovieId()

    expect(getLatestMovie).toBe(latestMovie.id)

  })
  describe("updateMoviesRandom", () => {
    beforeEach(() => {
      helper.randomizeNumber = jest.fn();
      getLatestMovieId = jest.fn(() => 10);
    });
    afterEach(() => {
      jest.clearAllMocks()
    });
    test("updateMoviesRandom updates state correctly", () => {
      const payload = [{
        title: 'Cool Movie',
        id: 10
      }]

      const store = storeFactory();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: payload,
        });
      });

      return store.dispatch(updateMoviesRandom()).then(() => {
        const newState = store.getState();
        const newStateMovie = newState.moviesList;
        expect(newStateMovie.movies[0]).toBe(payload)
        expect(helper.randomizeNumber).toHaveBeenCalledTimes(1)
      })
    })
    test("updateMoviesRandom is called again if api fails", () => {
      const payload = {
        status_code: 34
      }
      const store = storeFactory();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
          response: payload
        });
      })

      return store.dispatch(updateMoviesRandom()).then(() => {
        expect(helper.randomizeNumber).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe("updateMoviesFilter", () => {
    let payload
    beforeEach(() => {
      payload = {
        results: [{
            title: "Cool Movie",
          },
          {
            title: "Cool Movie 2",
          },
        ],
        total_pages: 10,
        total_results: 1
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: payload,
        });
      });
      helper.certificateGrouping = jest.fn();
    })
    test("updateMoviesFilter updates state correctly", () => {
      //pass in the object

      const store = storeFactory();
      return store.dispatch(updateMoviesFilter()).then(() => {
        const newState = store.getState();
        const newStatePayload = newState.moviesList;
        expect(newStatePayload.movies).toBe(payload.results);
        expect(newStatePayload.totalPages).toBe(payload.total_pages);
        expect(newStatePayload.totalResults).toBe(payload.total_results);
      })
    })
    test("query string is created succesfully", () => {
      const store = storeFactory();
      const filterObj = {
        certificates: [{
          id: 'PG',
          order: 2
        }, {
          id: 'PG',
          order: 3
        }],
        gernres: [35, 16],
        year: "1990"
      }
      actionHelper.getFilterQuery = jest.fn()
      const mockFn = actionHelper.getFilterQuery
      return store.dispatch(updateMoviesFilter(filterObj)).then(() => {
        expect(mockFn).toHaveBeenCalledWith(filterObj)
      })

    })
  })

});