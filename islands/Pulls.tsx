/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, useEffect, useState } from "../client_deps.ts";
import { Paging } from "../components/Paging.tsx";
import { Pagenation } from "../logics/github.ts";
import { PagingProps } from "../types/comment.ts";

const PER_PAGE = 30;

export default function Repo(props: PagingProps) {
  const [pulls, setPulls] = useState({ pulls: [] });
  const [url, setUrl] = useState(props.initUrl);
  const [page, setPage] = useState(
    new URL(props.initUrl).searchParams.get("page"),
  );
  const [link, setLink] = useState<{ link: Pagenation }>({
    link: { hasNext: false, hasPrev: false },
  });

  useEffect(() => {
    const call = async () => {
      const res = await fetch(
        `/api/github/pulls/${
          encodeURIComponent(props.name)
        }?page=${page}&per_page=${PER_PAGE}`,
      );
      const json = await res.json();
      if (json.pulls) {
        setPulls({ pulls: json.pulls });
      }

      if (json.link) {
        setLink({ link: json.link });
      }
    };
    call();
    const newUrl = new URL(url);
    newUrl.searchParams.set("page", page || "1");
    if (page) {
      window.history.pushState(null, "", newUrl);
    } else {
      window.history.replaceState(null, "", newUrl);
    }
    setUrl(newUrl.toString());
  }, [page]);
  const onPrevPage = () => {
    if (link.link.hasPrev && link.link.prev) {
      setPage(link.link.prev.toString());
    }
  };
  const onNextPage = () => {
    if (link.link.hasNext && link.link.next) {
      setPage(link.link.next.toString());
    }
  };

  return (
    <>
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
      <div class="list-group list-group">
        {pulls.pulls.map((val, idx) => (
          <a
            href={val["html_url"]}
            class="list-group-item list-group-item-action"
            key={idx}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <i class="me-3 bi bi-box-arrow-up-right"></i>
            {val["title"]}
          </a>
        ))}
      </div>
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
    </>
  );
}
