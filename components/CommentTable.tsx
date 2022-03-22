/** @jsx h */
import { h } from "../client_deps.ts";

interface CommentProps {
  body: string;
  user: { login: string };
  html_url: string;
  created_at: string;
}

export default function CommentTable(
  { comments }: { comments: CommentProps[] },
) {
  return (
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">User</th>
          <th scope="col">Comment</th>
          <th scope="col">CreatedAt</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((val, idx) => (
          <tr key={idx}>
            <td>
              <a
                class="w-100 d-block"
                target="_blank"
                rel="nofollow noopener noreferrer"
                href={val["html_url"]}
              >
                {val["user"]["login"]}
              </a>
            </td>
            <td>
              <a
                class="w-100 d-block"
                target="_blank"
                rel="nofollow noopener noreferrer"
                href={val["html_url"]}
              >
                <pre class="mb-0">
                  {val["body"]}
                </pre>
              </a>
            </td>
            <td>
              <a
                class="w-100 d-block"
                target="_blank"
                rel="nofollow noopener noreferrer"
                href={val["html_url"]}
              >
                {val["created_at"]}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
