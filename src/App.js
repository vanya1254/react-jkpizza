import "./scss/app.scss";

import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { Sort } from "./components/Sort";
import { PizzaBlock } from "./components/PizzaBlock";

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          {true ? (
            <PizzaBlock />
          ) : (
            <div class="content__error-info">
              <h2>Произошла ошибка 😕</h2>
              <p>
                К сожалению, не удалось получить питсы. Попробуйте повторить
                попытку позже.
              </p>
            </div>
          )}
          {/* <ul class="Pagination_root__uwB0O">
            <li class="previous disabled">
              <a
                class=" "
                tabindex="-1"
                role="button"
                aria-disabled="true"
                aria-label="Previous page"
                rel="prev"
              >
                &lt;
              </a>
            </li>
            <li class="selected">
              <a
                rel="canonical"
                role="button"
                tabindex="-1"
                aria-label="Page 1 is your current page"
                aria-current="page"
              >
                1
              </a>
            </li>
            <li>
              <a rel="next" role="button" tabindex="0" aria-label="Page 2">
                2
              </a>
            </li>
            <li>
              <a role="button" tabindex="0" aria-label="Page 3">
                3
              </a>
            </li>
            <li class="next">
              <a
                class=""
                tabindex="0"
                role="button"
                aria-disabled="false"
                aria-label="Next page"
                rel="next"
              >
                &gt;
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default App;
