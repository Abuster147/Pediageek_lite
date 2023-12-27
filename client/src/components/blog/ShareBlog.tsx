import { useDispatch, useSelector } from "react-redux";
import { ALERT } from "../../redux/types/alertType";
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { IBlog, RootStore } from "../../utils/TypeScript";

export interface IProps {
  blog: IBlog;
}

const ReactShare: React.FC<IProps> = ({ blog }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStore) => state);
  let arr = ["pediageek", blog.category];
  const copy1 = () => {
    navigator.clipboard.writeText(`${blog.title}
            ${blog.like}Likes, ${blog.comment}Comments
            ${blog.description}
            https://www.pediageek.com/blog/${blog._id}?ref=${auth.user?._id}`);

    dispatch({ type: ALERT, payload: { success: "Copied." } });
  };
  return (
    <div className="mt-1">
      <div className="d-flex justify-content-around w-100">
        <div>
          <i
            className="fas fa-copy fa-lg bg-light p-2 rounded-circle border"
            onClick={copy1}
            style={{ cursor: "pointer" }}
          ></i>{" "}
        </div>
        <div>
          <TwitterShareButton
            className="mx-1"
            url={`https://www.pediageek.com/blog/${blog._id}`}
            title={blog.title}
            hashtags={["pediageek"]}
          >
            <TwitterIcon size={35} round={true} />{" "}
          </TwitterShareButton>
        </div>
        <div>
          <FacebookShareButton
            className="mx-1"
            url={`https://www.pediageek.com/blog/${blog._id}`}
            quote={blog.title}
          >
            <FacebookIcon size={35} round={true} />{" "}
          </FacebookShareButton>
        </div>
        <div>
          <LinkedinShareButton
            className="mx-1"
            url={`https://www.pediageek.com/blog/${blog._id}`}
            title={blog.title}
            summary={blog.description}
            source={"pediageek.com"}
          >
            <LinkedinIcon size={35} round={true} />{" "}
          </LinkedinShareButton>
        </div>
        <div>
          <TelegramShareButton
            className="mx-1"
            url={`https://www.pediageek.com/blog/${blog._id}`}
            title={blog.title}
          >
            <TelegramIcon size={35} round={true} />{" "}
          </TelegramShareButton>
        </div>
        <div>
          <WhatsappShareButton
            className="mx-1"
            url={`https://www.pediageek.com/blog/${blog._id}`}
            title={blog.title}
          >
            <WhatsappIcon size={35} round={true} />{" "}
          </WhatsappShareButton>
        </div>
        <div>
          {typeof blog.thumbnail === "string" && (
            <PinterestShareButton
              className="mx-1"
              url={`https://www.pediageek.com/blog/${blog._id}`}
              media={blog.thumbnail}
              description={blog.description}
            >
              <PinterestIcon size={35} round={true} />{" "}
            </PinterestShareButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactShare;
