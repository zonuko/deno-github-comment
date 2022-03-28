/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, useEffect, useState } from "../client_deps.ts";
import CommentTable from "../components/CommentTable.tsx";
import { Paging } from "../components/Paging.tsx";
import { Pagenation } from "../logics/github.ts";
import { PagingProps } from "../types/comment.ts";

const PER_PAGE = 100;
export default function IssueComments(props: PagingProps) {
  const [issueComments, setIssueComments] = useState({ issueComments: [] });
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
        `/api/github/comments/issues/${
          encodeURIComponent(props.name)
        }?page=${page}&per_page=${PER_PAGE}`,
      );
      const json = await res.json();
      if (json.issueComments) {
        setIssueComments({ issueComments: json.issueComments });
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
      <CommentTable comments={issueComments.issueComments} />
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
    </>
  );
}
