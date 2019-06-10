import React, { createContext, useContext, useEffect, useReducer } from "react";
import "./App.css";
import Card from "./Card.js";
import SearchBar from "./SearchBar.js";
import ReactPaginate from "react-paginate";
import FavoriteCounter from "./FavoriteCounter";
import star from "./images/star.svg";
import wars from "./images/wars.svg";

const AppContext = createContext();

const App = () => {
  // const [people, setPeople] = useState([]);
  // const [query, setQuery] = useState("");

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "FAVORITE_COUNT_CHANGED":
          return {
            ...state,
            favoriteCount: action.count
          };

        case "PAGE_INDEX_CHANGE":
          return {
            ...state,
            page: action.page,
            needUpdate: true
          };

        case "PEOPLE_LOADED":
          return {
            ...state,
            pageCount: action.pageCount,
            people: action.people,
            needUpdate: false
          };

        case "PLANETS_LOADED":
          return {
            ...state,
            planets: action.planets
          };

        case "UPDATED":
          return {
            ...state,
            needUpdate: false
          };

        case "QUERY_CHANGE":
          return {
            ...state,
            query: action.query,
            needUpdate: true
          };

        default:
          return state;
      }
    },
    {
      favoriteCount: 0,
      needUpdate: false,
      page: 0,
      pageCount: 9,
      people: null,
      planets: null,
      query: ""
    }
  );

  useEffect(() => {
    let current = true;

    if (!state.planets) {
      // initialize planets
      fetch(`http://localhost:3008/planets`)
        .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
        .then(planets => {
          // console.log(`planets:`, planets);
          if (current) {
            dispatch({ type: "PLANETS_LOADED", planets });
          }
        })
        .catch(err => console.error(err));
    }

    if (!state.people) {
      let totalCount;
      // initialize page 1 of cards
      fetch(`http://localhost:3008/people?_page=1&_limit=10`)
        .then(res => {
          totalCount = res.headers.get("X-Total-Count");
          return res.ok ? res.json() : Promise.reject(res.statusText);
        })
        .then(people => {
          if (current) {
            dispatch({
              type: "PEOPLE_LOADED",
              people,
              pageCount: Math.ceil(totalCount / 10)
            });
          }
        })
        .catch(err => console.error(err));
    }

    if (state.needUpdate) {
      let totalCount;
      fetch(
        `http://localhost:3008/people?_page=${state.page}&_limit=10&q=${
          state.query
        }`
      )
        .then(res => {
          totalCount = res.headers.get("X-Total-Count");
          return res.ok ? res.json() : Promise.reject(res.statusText);
        })
        .then(people => {
          if (current) {
            dispatch({
              type: "PEOPLE_LOADED",
              people,
              pageCount: Math.ceil(totalCount / 10)
            });
          }
        })
        .catch(err => console.error(err));
    }

    return () => {
      current = false;
    };
  }, [state]);

  return (
    <div className="content">
      {/* <AppContext.Provider value={{ planets: state.planets }}> */}
      <div className="logo">
        <img src={star} alt="star-logo" />
        <span className="interview-text">The Interview</span>
        <img src={wars} alt="wars-logo" />
      </div>

      <SearchBar
        query={state.query}
        onChange={e =>
          dispatch({ type: "QUERY_CHANGE", query: e.target.value })
        }
      />

      <FavoriteCounter count={state.favoriteCount} />

      <ReactPaginate
        breakLabel={"..."}
        containerClassName={"pagination"}
        marginPagesDisplayed={2}
        nextLabel={"Next"}
        onPageChange={({ selected }) => {
          dispatch({ type: "PAGE_INDEX_CHANGE", page: selected + 1 });
        }}
        pageCount={state.pageCount}
        pageRangeDisplayed={state.pageCount}
        previousLabel={"Previous"}
      />

      {state.people &&
        state.people.map(({ birth_year, homeworld, id, image, name }) => {
          const homePlanet =
            state.planets.find(planet => planet.id === homeworld) || {};
          // determine if id is in peoplefavorites array

          return (
            <Card
              birthday={birth_year}
              homePlanet={homePlanet.name}
              id={id}
              image={image}
              isFavorite={false}
              key={id}
              name={name}
              // I realize that this makes the child component need to know the workings of how onFavorite needs to work but for this small app I'm ok w/ that.
              onFavoriteToggle={favorited =>
                dispatch({
                  type: "FAVORITE_COUNT_CHANGED",
                  count: favorited
                    ? state.favoriteCount + 1
                    : state.favoriteCount - 1
                })
              }
            />
          );
        })}
      {/* </AppContext.Provider> */}
    </div>
  );
};

export default App;

export function useAppContext() {
  return useContext(AppContext);
}
