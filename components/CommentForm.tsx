/** @jsx h */
import { h, useState } from "../client_deps.ts";
const CSS = `
.my-collapse {
  transition: height 300ms;
  overflow: hidden;
  display: block;
}

.visible {
  height: 100px;
}

.hidden {
  height: 0;
}`;

interface Props {
  csvUrl: string;
}
export default function CommentForm(props: Props) {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen((prev: boolean) => !prev);
  };

  return (
    <div>
      <style>{CSS}</style>
      <div class="btn-group mt-2" role="group">
        {
          /*TODO: implemantation
           <button onClick={onClick} class="btn btn-sm btn-outline-primary">
          {open ? "Search Close" : "Search Open"}
        </button> */
        }
        <a
          href={props.csvUrl}
          class="btn btn-sm btn-outline-primary"
        >
          CSV Download
        </a>
      </div>
      <div
        className={`my-collapse ${open ? " mb-2 visible" : "mb-2 hidden"}`}
      >
        <div class="form-group mt-2">
          <label for="sort">Sort</label>
          <select class="form-control" id="sort">
            <option>ASC</option>
            <option>DESC</option>
          </select>
        </div>
      </div>
    </div>
  );
}
