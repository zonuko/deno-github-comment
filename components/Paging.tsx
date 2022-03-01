/** @jsx h */
import { h } from "../deps.ts";
import { Pagenation } from "../logics/github.ts";
export function Paging(
  props: { onNext: () => void; onPrev: () => void; link: Pagenation },
) {
  if (!props.link.hasNext && !props.link.hasPrev) {
    return <div></div>;
  }
  return (
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <button
            onClick={props.onPrev}
            disabled={!props.link.hasPrev}
            className={props.link.hasPrev
              ? "page-link"
              : "page-link btn disabled"}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li class="page-item">
          <button
            onClick={props.onNext}
            disabled={!props.link.hasNext}
            className={props.link.hasNext ? "page-link"
            : "page-link btn disabled"}
            class="page-link"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
