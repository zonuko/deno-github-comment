/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, useEffect, useState } from "../client_deps.ts";
import { Paging } from "../components/Paging.tsx";
import { Pagenation } from "../logics/github.ts";
import { PagingProps } from "../types/comment.ts";

const PER_PAGE = 30;

export default function Repo(props: PagingProps) {
  const url = new URL(props.initUrl);
  const page = url.searchParams.get("page");

  const [pulls, setPulls] = useState({ pulls: [] });
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
  }, [page]);
  const onPrevPage = () => {
    if (link.link.hasPrev && link.link.prev) {
      url.searchParams.set("page", link.link.prev.toString());
      document.location.href = url.toString();
    }
  };
  const onNextPage = () => {
    if (link.link.hasNext && link.link.next) {
      url.searchParams.set("page", link.link.next.toString());
      document.location.href = url.toString();
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
