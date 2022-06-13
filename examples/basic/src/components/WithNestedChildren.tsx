import { JSXElement } from "solid-js";

interface Props {
  children: JSXElement;
}

export const WithNestedChildren = (props: Props) => <div>{props.children}</div>;
