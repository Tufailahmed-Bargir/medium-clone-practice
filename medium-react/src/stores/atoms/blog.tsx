import { atom } from "recoil";

type Blog = {
  id: string;
  title: string;
  desc: string;
  publish: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export const blogsState = atom<Blog[]>({
  key: "blogsState",
  default: [],
});
