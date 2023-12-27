import React from "react";
import { IBlog } from "../../utils/TypeScript";
import Comments from "./Comments";
import GoodBlog from "./GoodBlog";
import Sidebard from "../ads/Sidebard";
export interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}
const Sidebar: React.FC<IProps> = ({ blog, setBlog }) => {
  return (
    <div>
      <GoodBlog blog={blog} setBlog={setBlog} />
      <Comments blog={blog} />
      <Sidebard />
    </div>
  );
};

export default Sidebar;
