import { JSXElement } from "solid-js";

interface Props {
  children: JSXElement;
}

export const WithComponentChildren = (props: Props) => (
  <div>{props.children}</div>
);
